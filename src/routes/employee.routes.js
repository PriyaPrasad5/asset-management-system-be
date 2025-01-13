import express from "express";
import {
  createRequest,
  deleteRequest,
  getRequest,
} from "../controllers/employee.controller.js";
import { isEmployee } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/request", isEmployee, createRequest);
router.get("/request", isEmployee, getRequest);
router.patch("/request/:id", isEmployee, deleteRequest);

export default router;
