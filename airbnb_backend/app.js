import express from "express";
import fileUpload from "express-fileupload";
import { db } from "./src/config/database.js";
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
// Middleware để xử lý upload file (nếu sử dụng express-fileupload)
app.use(fileUpload());


app.use("/api/users", userRoutes);
app.use("/api/vi-tri", viTriRoutes);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi đồng bộ cơ sở dữ liệu:", error);
  });
