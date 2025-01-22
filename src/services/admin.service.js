import { Sequelize } from "sequelize";
import db from "../models/relationshipManager.js";

const { Asset, Allocation, User, Request } = db;

export const saveAsset = async (assetData) => {
  const { name, type, assetIdentifier, purchaseDate, warrantyEndDate } =
    assetData;
  const asset = await Asset.create({
    name,
    type,
    status: "AVAILABLE",
    assetIdentifier,
    purchaseDate,
    warrantyEndDate,
    isActive: 1,
  });
  return asset;
};

export const fetchAssets = async () => {
  const assets = await Asset.findAll({ where: { isActive: 1 } });
  return assets;
};

export const fetchAssetById = async (id) => {
  const asset = await Asset.findByPk(id, { where: { isActive: 1 } });
  return asset;
};

export const modifyAsset = async (
  id,
  status,
  warrantyEndDate,
  nextServiceDate
) => {
  const asset = await Asset.findByPk(id);

  if (!asset) {
    throw new Error("Asset Not Found");
  }

  await asset.update({ status, warrantyEndDate, nextServiceDate });
  return asset;
};

export const removeAsset = async (id) => {
  const asset = await Asset.findByPk(id);
  if (!asset) {
    throw new Error("Asset Not Found");
  }
  await asset.update({ isActive: 0 });
  return asset;
};

export const getAssetUtilizationReportService = async () => {
  try {
    const totalAssets = await Asset.count({ where: { isActive: 1 } });
    const assignedAssets = await Asset.count({
      where: { status: "ASSIGNED", isActive: 1 },
    });
    const availableAssets = await Asset.count({
      where: { status: "AVAILABLE", isActive: 1 },
    });
    const underMaintenanceAssets = await Asset.count({
      where: { status: "UNDER_MAINTENANCE", isActive: 1 },
    });

    const report = {
      totalAssets,
      assignedPercentageValue: Math.round((assignedAssets / totalAssets) * 100),
      availablePercentageValue: Math.round(
        (availableAssets / totalAssets) * 100
      ),
      underMaintenancePercentageValue: Math.round(
        (underMaintenanceAssets / totalAssets) * 100
      ),
      assignedAssets: assignedAssets,
      availableAssets: availableAssets,
      underMaintenanceAssets: underMaintenanceAssets,
    };
    return report;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate asset utilization report.");
  }
};

export const fetchHistoryByUserService = async (userId) => {
  const history = await Allocation.findAll({
    where: { userId },
    include: [
      { model: Asset, attributes: ["id", "name", "type"] },
      { model: User },
    ],
    order: [["createdOn", "DESC"]],
  });

  const requestCounts = await Request.findAll({
    where: { userId },
    attributes: [
      "status",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
    ],
    group: ["status"],
  });
  return { history, requestCounts };
};

export const fetchHistoryByAssetService = async (assetId) => {
  const history = await Allocation.findAll({
    where: { assetId },
    include: [{ model: User, attributes: ["id", "name", "email"] }],
    order: [["createdOn", "DESC"]],
  });

  return history;
};

export const fetchUsers = async () => {
  const users = await User.findAll();
  return users;
};
