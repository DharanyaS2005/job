import multer from 'multer';
import dbConnect from '@/lib/db';
import Application from '@/models/application';
import initMiddleware from '@/lib/init-middleware'
import cors from '@/lib/cors'
const corsMiddleware = initMiddleware(cors)

// Storage setup to put files in /public/uploads
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Multer wrapper to use in API route (Next.js does not support middleware chaining)
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await corsMiddleware(req, res)
  await dbConnect();

  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, upload.single('resume'));

      const { name, email, jobId } = req.body;
      const resumeUrl = `/uploads/${req.file.filename}`;

      const application = await Application.create({ name, email, jobId, resumeUrl });

      res.status(201).json({ success: true, data: application });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { jobId } = req.query;

      const query = jobId ? { jobId } : {};
      const apps = await Application.find(query).sort({ createdAt: -1 });

      res.status(200).json(Array.isArray(apps) ? apps : []);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to fetch applications' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
