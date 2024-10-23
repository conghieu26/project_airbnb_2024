const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  taiKhoan: { type: String, required: true, unique: true },
  matKhau: { type: String, required: true },
  hoTen: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  soDT: { type: String, required: true },
  maLoaiNguoiDung: { type: String, default: "KhachHang" },
  avatar: { type: String },
});

module.exports = mongoose.model("User", userSchema);
