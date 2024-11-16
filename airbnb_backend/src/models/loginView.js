const mongoose = require("mongoose");

const LoginViewSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginView = mongoose.model("LoginView", LoginViewSchema);

module.exports = LoginView;
