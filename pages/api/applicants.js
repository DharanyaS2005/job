// pages/api/applicants.js
import connectDB from '@/lib/db';
import Applicant from '@/models/application';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // ✅ Verify token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Missing token.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Admins only.' });
    }

    const { jobId } = req.query;

    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const applicants = await Applicant.find({ jobId });
    return res.status(200).json(applicants);
  } catch (err) {
    console.error('Error fetching applicants:', err);
    return res.status(500).json({ error: 'Failed to fetch applicants' });
  }
}
