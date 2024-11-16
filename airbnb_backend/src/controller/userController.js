import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ThongTinNguoiDung } from "../models/thongTinNguoiDung.js";

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await ThongTinNguoiDung.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Tạo người dùng mới
export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, birthday, gender, role } = req.body;

    const userRole = role || "user";

    const newUser = await ThongTinNguoiDung.create({
      name,
      email,
      password,
      phone,
      birthday,
      gender,
      role: userRole,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await ThongTinNguoiDung.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    await user.destroy();
    res.status(200).json({ message: "Người dùng đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Phân trang và tìm kiếm người dùng
export const getUsersWithPaginationAndSearch = async (req, res) => {
  try {
    // Lấy giá trị phân trang và tìm kiếm từ query
    const { page = 1, size = 10, search = "" } = req.query;

    const pageNumber = parseInt(page);
    const sizeNumber = parseInt(size);

    if (isNaN(pageNumber) || isNaN(sizeNumber)) {
      return res
        .status(400)
        .json({ message: "Page và size phải là số hợp lệ." });
    }

    const offset = (pageNumber - 1) * sizeNumber;

    const users = await ThongTinNguoiDung.findAndCountAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${search}%`,
        },
      },
      limit: sizeNumber,
      offset: offset,
    });

    res.status(200).json({
      data: users.rows,
      total: users.count,
      totalPages: Math.ceil(users.count / sizeNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Lỗi khi phân trang và tìm kiếm người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Lấy người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await ThongTinNguoiDung.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi khi lấy người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, phone, birthday, gender, role } = req.body;

    const user = await ThongTinNguoiDung.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    user.birthday = birthday || user.birthday;
    user.gender = gender || user.gender;
    user.role = role || user.role;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Tìm kiếm người dùng theo tên
export const searchUserByName = async (req, res) => {
  try {
    const { TenNguoiDung } = req.params;
    const users = await ThongTinNguoiDung.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${TenNguoiDung}%`,
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Tạo đường dẫn thư mục upload cho ảnh
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads/avatars");

// Kiểm tra nếu thư mục không tồn tại, tạo mới
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadAvatar = async (req, res) => {
  try {
    // Kiểm tra nếu tệp đã được gửi trong yêu cầu
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ message: "Vui lòng gửi tệp hình ảnh" });
    }

    const avatar = req.files.avatar;
    const uploadPath = path.join(uploadDir, avatar.name);

    // Di chuyển tệp vào thư mục đích
    avatar.mv(uploadPath, (err) => {
      if (err) {
        console.error("Lỗi khi upload avatar:", err);
        return res
          .status(500)
          .json({ message: "Lỗi máy chủ", error: err.message });
      }

      // Đáp lại thông báo khi tải lên thành công
      res.status(200).json({
        message: "Avatar đã được tải lên thành công",
        avatarPath: uploadPath,
      });
    });
  } catch (error) {
    console.error("Lỗi khi tải avatar:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};
