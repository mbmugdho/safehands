import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    nid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)