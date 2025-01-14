import express from "express";
import {
  createAsset,
  deleteAsset,
  getAssetById,
  getAssetUtilizationReport,
  getAssets,
  updateAsset,
} from "../controllers/admin.controller.js";
import { getAssetsWithinWarrantyRange } from "../controllers/manager.controller.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/assets", isAdmin, createAsset);
router.get("/assets", isAdmin, getAssets);
router.patch("/assets/:id", isAdmin, updateAsset);
router.get("/assets/:id", isAdmin, getAssetById);
router.delete("/assets/:id", isAdmin, deleteAsset);
router.get("/assets/reports/asset-utilization", isAdmin, getAssetUtilizationReport);
router.get("/assets/warranty/date", isAdmin, getAssetsWithinWarrantyRange);


export default router;
