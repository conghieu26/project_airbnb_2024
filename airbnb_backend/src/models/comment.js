const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  roomId: { type: Number, required: true, ref: "Room" },
  userId: { type: Number, required: true, ref: "User" },
  commentDate: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
