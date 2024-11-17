import { PhongViewModel } from "../models/phongViewModel.js";
import { ViTriViewModel } from "../models/viTriViewModel.js";
import path from "path";
import fs from "fs";

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

// Lấy danh sách phòng theo mã vị trí
export const getRoomsByLocation = async (req, res) => {
  try {
    const { maViTri } = req.query;
    const rooms = await PhongViewModel.findAll({ where: { maViTri } });
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Lỗi khi lấy phòng theo vị trí:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Phân trang tìm kiếm phòng
export const paginateRooms = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await PhongViewModel.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: {
        model: ViTriViewModel,
        attributes: ["tenViTri", "tinhThanh", "quocGia"],
      },
    });

    res.status(200).json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      rooms: rows,
    });
  } catch (error) {
    console.error("Lỗi khi phân trang tìm kiếm phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Lấy thông tin chi tiết một phòng thuê theo ID
export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await PhongViewModel.findByPk(id, {
      include: {
        model: ViTriViewModel,
        attributes: ["tenViTri", "tinhThanh", "quocGia"],
      },
    });
    if (!room) {
      return res.status(404).json({ message: "Phòng không tồn tại" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Cập nhật thông tin phòng thuê theo ID
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = await PhongViewModel.update(req.body, {
      where: { id },
    });
    if (updatedRoom[0] === 0) {
      return res.status(404).json({ message: "Phòng không tồn tại" });
    }
    res.status(200).json({ message: "Cập nhật phòng thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Xóa một phòng thuê theo ID
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoom = await PhongViewModel.destroy({ where: { id } });
    if (!deletedRoom) {
      return res.status(404).json({ message: "Phòng không tồn tại" });
    }
    res.status(200).json({ message: "Xóa phòng thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};
