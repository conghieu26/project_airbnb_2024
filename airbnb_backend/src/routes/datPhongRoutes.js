import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  updateBooking,
} from "../controller/datPhongController.js";

const router = express.Router();

// Định nghĩa các route
router.get("/", getAllBookings);
router.post("/", createBooking);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/lay-theo-nguoi-dung/:MaNguoiDung", getBookingsByUser);

export default router;
