import { DataTypes } from "sequelize";
import { PhongViewModel } from "./phongViewModel.js";
import { ThongTinNguoiDung } from "./ThongTinNguoiDung.js";
import { db } from "./database.js";

export const BinhLuanViewModel = db.define("BinhLuanViewModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  maPhong: { type: DataTypes.INTEGER, allowNull: false },
  maNguoiBinhLuan: { type: DataTypes.INTEGER, allowNull: false },
  ngayBinhLuan: { type: DataTypes.STRING },
  noiDung: { type: DataTypes.TEXT },
  saoBinhLuan: { type: DataTypes.INTEGER },
});

BinhLuanViewModel.belongsTo(ThongTinNguoiDung, {
  foreignKey: "maNguoiBinhLuan",
});
BinhLuanViewModel.belongsTo(PhongViewModel, { foreignKey: "maPhong" });
