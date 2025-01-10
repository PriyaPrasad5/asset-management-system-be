import { createAssetService, getAssetsService } from "../services/admin.service.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const createAsset = async (req, res) => {
  try {
    const asset = await createAssetService(req.body);
    successHandler(asset,res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

export const getAssets = async (req, res) => {
  try {
    const assets = await getAssetsService();
    successHandler(assets,res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};
