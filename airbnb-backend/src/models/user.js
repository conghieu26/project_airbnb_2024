import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  birthday: { type: String },
  gender: { type: Boolean },
  role: { type: String },
});

export default mongoose.model("User", userSchema);
