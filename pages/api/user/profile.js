import dbConnect from '../../../lib/db';
import User from '../../../models/user';
import { verifyToken } from '../../../lib/auth';
import initMiddleware from '@/lib/init-middleware'
import cors from '@/lib/cors'

const corsMiddleware = initMiddleware(cors)

export default async function handler(req, res) {
  await corsMiddleware(req, res)
  await dbConnect();
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    const user = await User.findOne({ email: decoded.email }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
