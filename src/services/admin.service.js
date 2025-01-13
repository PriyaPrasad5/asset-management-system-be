import db from "../models/relationshipManager.js";

const { Asset } = db;

export const saveAsset = async (assetData) => {
  const { name, type, assetId, purchaseDate, warrantyEndDate } = assetData;
  const asset = await Asset.create({
    name,
    type,
    status: "AVAILABLE",
    assetId,
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

export const modifyAsset = async (id, status, warrantyEndDate) => {
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
    const totalAssets = await Asset.count();
    const assignedAssets = await Asset.count({ where: { status: "ASSIGNED" } });
    const availableAssets = await Asset.count({
      where: { status: "AVAILABLE" },
    });
    const underMaintenanceAssets = await Asset.count({
      where: { status: "UNDER_MAINTENANCE" },
    });

    const report = {
      totalAssets,
      assigned: (assignedAssets / totalAssets) * 100,
      available: (availableAssets / totalAssets) * 100,
      underMaintenance: (underMaintenanceAssets / totalAssets) * 100,
    };
    return report;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate asset utilization report.");
  }
};
