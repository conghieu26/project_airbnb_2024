import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model("Location", locationSchema);
