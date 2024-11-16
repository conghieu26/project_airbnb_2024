import { DataTypes } from "sequelize";
import { db } from "./database.js";
import { ThongTinNguoiDung } from "./ThongTinNguoiDung.js";
import { PhongViewModel } from "./phongViewModel.js";

export const DatPhongViewModel = db.define("DatPhongViewModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  maPhong: { type: DataTypes.INTEGER, allowNull: false },
  ngayDen: { type: DataTypes.DATE, allowNull: false },
  ngayDi: { type: DataTypes.DATE, allowNull: false },
  soLuongKhach: { type: DataTypes.INTEGER, allowNull: false },
  maNguoiDung: { type: DataTypes.INTEGER, allowNull: false },
});

DatPhongViewModel.belongsTo(ThongTinNguoiDung, { foreignKey: "maNguoiDung" });
DatPhongViewModel.belongsTo(PhongViewModel, { foreignKey: "maPhong" });
