import express from "express";

import { createRoom, getAllRooms } from "../controller/phongController.js";

const router = express.Router();

router.get("/", getAllRooms);
router.post("/", createRoom);

export default router;
