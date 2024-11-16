const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: String },
  gender: { type: Boolean },
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
