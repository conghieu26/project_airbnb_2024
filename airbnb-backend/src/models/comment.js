import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  _id: { type: Number },
  roomId: {
    type: Number,
    ref: "Room",
    required: true,
  },
  commenterId: {
    type: Number,
    ref: "User",
    required: true,
  },
  commentDate: { type: String },
  guestName: { type: String },
  rating: { type: Number },
});

export default mongoose.model("Comment", commentSchema);
