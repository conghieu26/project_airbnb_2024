const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  roomId: { type: Number, required: true, ref: "Room" },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  guestCount: { type: Number, required: true },
  userId: { type: Number, required: true, ref: "User" },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
