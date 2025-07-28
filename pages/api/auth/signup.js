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
  const { name, email, password, phone, gender, college, degree, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hash,
    phone,
    gender,
    college,
    degree,
    role: role || 'user',
  });
  const token = generateToken({ email, role: user.role });

  res.status(201).json({ token, role: user.role });
}
