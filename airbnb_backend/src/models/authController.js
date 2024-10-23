import mongoose from "mongoose";

const authControllerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("AuthController", authControllerSchema);
