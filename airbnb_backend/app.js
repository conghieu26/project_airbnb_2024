import express from "express";
import fileUpload from "express-fileupload";
import { db } from "./src/config/database.js";
import phongRoutes from "./src/routes/phongRoutes.js";
import signInRoutes from "./src/routes/signInRoutes.js";
import signUpRoutes from "./src/routes/signUpRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import viTriRoutes from "./src/routes/viTriRoutes.js";
import datPhongRoutes from "./src/routes/datPhongRoutes.js";

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

// Đăng ký
app.use("/api/auth", signUpRoutes);

// Đăng nhập
app.use("/api/auth", signInRoutes);

// Api thông tin người dùng
app.use("/api/users", userRoutes);

// Api thông tin vị trí
app.use("/api/vi-tri", viTriRoutes);

// Api phòng Thuê
app.use("/api/phong-thue", phongRoutes);

// Api đặt phòng
app.use("/api/dat-phong", datPhongRoutes);
db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi đồng bộ cơ sở dữ liệu:", error);
  });
