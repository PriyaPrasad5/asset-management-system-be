// import Asset from "../models/asset.model.js";
import db from "../models/relationshipManager.js";

const { Asset } = db;

// Create an asset
export const createAssetService = async (assetData) => {
  const asset = await Asset.create(assetData);
  return asset;
};

// Get all assets
export const getAssetsService = async () => {
  const assets = await Asset.findAll();
  return assets;
};
