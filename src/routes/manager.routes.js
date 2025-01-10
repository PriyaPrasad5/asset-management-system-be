import express from "express";
import { isAdmin, isManager, isEmployee } from "../middleware/authMiddleware.js";
import { createAsset, getAssets } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/manager/allocate", isManager, allocate);

export default router;