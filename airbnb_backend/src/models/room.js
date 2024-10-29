const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  washingMachine: { type: Boolean },
  iron: { type: Boolean },
  tv: { type: Boolean },
  airConditioning: { type: Boolean },
  wifi: { type: Boolean },
  kitchen: { type: Boolean },
  parking: { type: Boolean },
  pool: { type: Boolean },
  ironBoard: { type: Boolean },
  locationId: { type: Number, required: true, ref: "Location" },
  images: { type: String },
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
