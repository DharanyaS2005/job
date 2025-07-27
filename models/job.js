import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  postedBy: String,
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
