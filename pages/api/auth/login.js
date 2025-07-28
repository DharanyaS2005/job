import dbConnect from '../../../lib/db';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../lib/auth';
import initMiddleware from '@/lib/init-middleware'
import cors from '@/lib/cors'

const corsMiddleware = initMiddleware(cors)


export default async function handler(req, res) {
  await corsMiddleware(req, res)
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken({ email: user.email, role: user.role });
  return res.status(200).json({ token, role: user.role });
}
