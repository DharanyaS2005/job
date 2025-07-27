import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    jobId: String,
    resumeUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
