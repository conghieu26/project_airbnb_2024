import bcrypt from "bcryptjs";
import { ThongTinNguoiDung } from "../models/thongTinNguoiDung.js";
// Đăng ký tài khoản mới
export const signup = async (req, res) => {
  try {
    const {
      username,
      password,
      confirmPassword,
      name,
      email,
      phone,
      birthday,
      gender,
    } = req.body;

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Mật khẩu và xác nhận mật khẩu không khớp" });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const userExist = await ThongTinNguoiDung.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: "Email đã được đăng ký" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log(hashedPassword);
    // Tạo người dùng mới trong cơ sở dữ liệu
    const newUser = await ThongTinNguoiDung.create({
      name,
      email,
      password: hashedPassword,
      phone,
      birthday,
      gender,
      role: "user", // default role là user
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        birthday: newUser.birthday,
        gender: newUser.gender,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};
