import express from "express";
import { isAdmin, isManager, isEmployee } from "../middleware/authMiddleware.js";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",isEmployee, login);

export default router;
