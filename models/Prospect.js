import mongoose from 'mongoose';

const prospectSchema = new mongoose.Schema({
  email: String,
  name: String,
  workspaceEmail: String,
  unsubscribed: { type: Boolean, default: false }
});

export default mongoose.model('Prospect', prospectSchema);
