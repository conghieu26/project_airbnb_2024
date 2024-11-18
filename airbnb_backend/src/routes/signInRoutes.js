import express from "express";
import { signin } from "../controller/signInController.js";

const router = express.Router();

// Đăng nhập
router.post("/signin", signin);

export default router;
