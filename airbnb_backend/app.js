import express from "express";
import fileUpload from "express-fileupload";
import { db } from "./src/config/database.js";
import userRoutes from "./src/routes/userRoutes.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(fileUpload());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/users", userRoutes);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi đồng bộ cơ sở dữ liệu:", error);
  });
