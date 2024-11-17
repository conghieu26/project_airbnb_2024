import express from "express";
import multer from "multer";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  getRoomsByLocation,
  paginateRooms,
  updateRoom,
} from "../controller/phongController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getAllRooms);
router.post("/", createRoom);
router.get("/lay-phong-theo-vi-tri", getRoomsByLocation);
router.get("/phan-trang-tim-kiem", paginateRooms);
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
