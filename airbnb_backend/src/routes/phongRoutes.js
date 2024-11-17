import express from "express";

import {
  createRoom,
  getAllRooms,
  getRoomsByLocation,
} from "../controller/phongController.js";

const router = express.Router();

router.get("/", getAllRooms);
router.post("/", createRoom);
router.get("/lay-phong-theo-vi-tri", getRoomsByLocation);

export default router;
