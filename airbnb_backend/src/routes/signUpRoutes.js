import express from "express";
import { signup } from "../controller/signUpController.js";

const router = express.Router();

// Đăng ký
router.post("/signup", signup);

export default router;
