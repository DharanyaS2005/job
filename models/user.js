import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  gender: String,
  college: String,
  degree: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
