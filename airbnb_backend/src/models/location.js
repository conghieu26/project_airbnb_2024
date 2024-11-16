const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  images: { type: String },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
