import bcrypt from "bcryptjs";
import { ThongTinNguoiDung } from "../models/thongTinNguoiDung.js";

// Đăng nhập
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await ThongTinNguoiDung.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const storedHashedPassword = user.password;

    const isPasswordValid = await bcrypt.compare(
      password,
      storedHashedPassword
    );
      
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
        gender: user.gender,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};
