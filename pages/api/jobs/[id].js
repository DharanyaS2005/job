import dbConnect from '../../../lib/db';
import Job from '../../../models/job';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(job);
  }

  if (req.method === 'DELETE') {
    await Job.findByIdAndDelete(id);
    return res.status(204).end();
  }
}
