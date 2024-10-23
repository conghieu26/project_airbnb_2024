import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  rooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  washingMachine: { type: Boolean },
  ironingBoard: { type: Boolean },
  tv: { type: Boolean },
  airConditioning: { type: Boolean },
  wifi: { type: Boolean },
  kitchen: { type: Boolean },
  parking: { type: Boolean },
  pool: { type: Boolean },
  iron: { type: Boolean },
  locationId: {
    type: Number,
    ref: "Location",
    required: true,
  },
  image: { type: String },
});

export default mongoose.model("Room", roomSchema);
