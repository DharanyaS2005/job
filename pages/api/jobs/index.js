import dbConnect from '../../../lib/db';
import Job from '../../../models/job';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const jobs = await Job.find();
      return res.status(200).json(jobs); // ✅ Return array directly
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  }

  if (req.method === 'POST') {
  const authHeader = req.headers.authorization;
  const { title, description } = req.body;

  // Allow static admin without token
  if (!authHeader && req.body?.email === 'admin@example.com') {
    try {
      const job = await Job.create({ title, description, postedBy: 'admin@example.com' });
      return res.status(201).json(job);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create job' });
    }
  }

  // If token is provided
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const postedBy = decoded.email;

    const job = await Job.create({ title, description, postedBy });
    return res.status(201).json(job);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

  return res.status(405).json({ error: 'Method not allowed' });
}
