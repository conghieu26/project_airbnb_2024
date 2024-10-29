const mongoose = require("mongoose");

const UpdateUserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: String },
  gender: { type: Boolean },
  role: { type: String },
});

const UpdateUser = mongoose.model("UpdateUser", UpdateUserSchema);

module.exports = UpdateUser;
