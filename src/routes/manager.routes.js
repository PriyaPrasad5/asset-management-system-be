import express from "express";
import { getAssets, updateAsset } from "../controllers/admin.controller.js";
import {
  approveRequest,
  getAssetsWithinWarrantyRange,
  getRequestById,
  getRequests,
  rejectRequest,
} from "../controllers/manager.controller.js";
import { isManager } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/assets", isManager, getAssets);
router.get("/requests", isManager, getRequests);
router.patch("/request/:id/approve", isManager, approveRequest);
router.patch("/request/:id/reject", isManager, rejectRequest);
router.get("/request/:id", isManager, getRequestById);
router.patch("/assets/:id", isManager, updateAsset);
router.get("/assets/warranty/date", isManager, getAssetsWithinWarrantyRange);

export default router;
