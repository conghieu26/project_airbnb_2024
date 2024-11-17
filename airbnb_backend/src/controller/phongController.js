import { PhongViewModel } from "../models/phongViewModel.js";
import { ViTriViewModel } from "../models/viTriViewModel.js";

// Lấy danh sách tất cả các phòng thuê
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await PhongViewModel.findAll({
      include: {
        model: ViTriViewModel,
        attributes: ["tenViTri", "tinhThanh", "quocGia"],
      },
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Thêm mới một phòng thuê
export const createRoom = async (req, res) => {
  try {
    const newRoom = await PhongViewModel.create(req.body);
    res.status(201).json({ message: "Tạo phòng thành công", room: newRoom });
  } catch (error) {
    console.error("Lỗi khi tạo phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};
