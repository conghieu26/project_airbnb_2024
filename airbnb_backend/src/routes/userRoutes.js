import express from "express";
import fileUpload from "express-fileupload";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUsersWithPaginationAndSearch,
  searchUserByName,
  updateUser,
  uploadAvatar,
} from "../controller/userController.js";

const router = express.Router();

// Middleware để hỗ trợ upload file
router.use(fileUpload());

// Lấy tất cả người dùng
router.get("/", getAllUsers);

// Tạo người dùng mới
router.post("/", createUser);

// Xóa người dùng
router.delete("/:id", deleteUser);

// Phân trang và tìm kiếm người dùng
router.get("/phan-trang-tim-kiem", getUsersWithPaginationAndSearch);

// Lấy người dùng theo ID
router.get("/:id", getUserById);

// Cập nhật người dùng
router.put("/:id", updateUser);

// Tìm kiếm người dùng theo tên
router.get("/search/:TenNguoiDung", searchUserByName);

// Upload avatar
router.post("/upload-avatar/:id", uploadAvatar);

export default router;
