import { DataTypes } from "sequelize";
import { db } from "./database.js";

export const ViTriViewModel = db.define("ViTriViewModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tenViTri: { type: DataTypes.STRING, allowNull: false },
  tinhThanh: { type: DataTypes.STRING },
  quocGia: { type: DataTypes.STRING },
  hinhAnh: { type: DataTypes.STRING },
});