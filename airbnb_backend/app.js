import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { db } from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import binhLuanRoutes from "./src/routes/binhLuanRoutes.js";
import datPhongRoutes from "./src/routes/datPhongRoutes.js";
import phongRoutes from "./src/routes/phongRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import viTriRoutes from "./src/routes/viTriRoutes.js";

const app = express();
const PORT = 3000;

// Middleware để xử lý JSON và các request body
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

app.use(cors());

// Api đăng ký và đăng nhập
app.use("/api/auth", authRoutes);

// Api thông tin người dùng
app.use("/api/users", userRoutes);

// Api thông tin vị trí
app.use("/api/vi-tri", viTriRoutes);

// Api phòng Thuê
app.use("/api/phong-thue", phongRoutes);

// Api đặt phòng
app.use("/api/dat-phong", datPhongRoutes);

// Api Bình luận
app.use("/api/binh-luan", binhLuanRoutes);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi đồng bộ cơ sở dữ liệu:", error);
  });
