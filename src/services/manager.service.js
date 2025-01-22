import { Op } from "sequelize";
import db from "../models/relationshipManager.js";

const { Request, Allocation, Asset, User } = db;

export const fetchRequests = async () => {
  const request = await Request.findAll({ where: { isActive: 1 } });
  return request;
};

export const fetchRequest = async (id) => {
  const request = await Request.findByPk(id, { where: { isActive: 1 } });
  return request;
};

export const approveRaisedRequest = async (id, assetId, reason) => {
  const request = await Request.findByPk(id, { include: [Asset] });

  if (!request) {
    throw new Error("Request Not Found");
  }

  if (request.type === "REQUEST_ASSET") {
    const asset = await Asset.findByPk(assetId);

    // Assign the asset to the user
    await asset.update({ status: "ASSIGNED", userId: request.userId });

    // Log the allocation in history
    await Allocation.create({
      assetId: assetId,
      userId: request.userId,
      type: "ALLOCATION",
    });
  }

  if (request.type === "RETURN_ASSET") {
    const asset = await Asset.findByPk(assetId);

    if (asset && asset.userId === request.userId) {
      // Free the asset
      await asset.update({ status: "AVAILABLE", userId: null });

      // Log the return in history
      await Allocation.create({
        assetId: assetId,
        userId: request.userId,
        type: "RETURN",
      });
    }
  }
  await request.update({ status: "APPROVED", assetId, reason, isActive: 0 });
  return request;
};

export const rejectRaisedRequest = async (id, reason) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error("Request Not Found");
  }

  await request.update({ status: "REJECTED", reason, isActive: 0 });
  return request;
};

export const fetchAssetsWithinWarrantyRange = async (date) => {
  const userDate = new Date(date);
  const currentDate = new Date();

  // Determine the range dynamically based on which date is earlier/later
  const startDate = userDate < currentDate ? userDate : currentDate;
  const endDate = userDate > currentDate ? userDate : currentDate;

  const assets = await Asset.findAll({
    where: {
      warrantyEndDate: {
        [Op.between]: [startDate, endDate],
      },
      isActive: 1,
    },
  });
  return assets;
};
