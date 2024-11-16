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
router.get("/users", getAllUsers);

// Tạo người dùng mới
router.post("/users", createUser);

// Xóa người dùng
router.delete("/users/:id", deleteUser);

// Phân trang và tìm kiếm người dùng
router.get("/users/phan-trang-tim-kiem", getUsersWithPaginationAndSearch);

// Lấy người dùng theo ID
router.get("/users/:id", getUserById);

// Cập nhật người dùng
router.put("/users/:id", updateUser);

// Tìm kiếm người dùng theo tên
router.get("/users/search/:TenNguoiDung", searchUserByName);

// Upload avatar
router.post("/users/upload-avatar/:id", uploadAvatar);

export default router;
