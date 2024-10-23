import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  _id: { type: Number },
  roomId: {
    type: Number,
    ref: "Room",
    required: true,
  },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  numberOfPeople: { type: Number, required: true },
});

export default mongoose.model("Booking", bookingSchema);
