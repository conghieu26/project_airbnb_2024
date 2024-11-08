const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const UserSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: String },
  gender: { type: Boolean },
  role: { type: String, default: "user" },
});
UserSchema.plugin(paginate);
const User = mongoose.model("User", UserSchema);

module.exports = User;
