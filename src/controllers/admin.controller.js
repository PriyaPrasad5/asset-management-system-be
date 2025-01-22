import {
  fetchAssetById,
  fetchAssets,
  fetchHistoryByAssetService,
  fetchHistoryByUserService,
  fetchUsers,
  getAssetUtilizationReportService,
  modifyAsset,
  removeAsset,
  saveAsset,
} from "../services/admin.service.js";
import { validateSchema } from "../utils/common.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import {
  CreateAssetValidationObj,
  UpdateAssetValidationObj,
} from "../validations/asset.validation.js";

export const createAsset = async (req, res) => {
  try {
    const { error, message } = await validateSchema(
      CreateAssetValidationObj,
      req.body
    );
    if (error) {
      return errorHandler(new Error(message), 400, res);
    }
    const { name, type, assetIdentifier, purchaseDate, warrantyEndDate } =
      req.body;
    const asset = await saveAsset({
      name,
      type,
      assetIdentifier,
      purchaseDate,
      warrantyEndDate,
    });
    return successHandler(asset, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getAssets = async (req, res) => {
  try {
    const assets = await fetchAssets();
    return successHandler(assets, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getAssetById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return errorHandler(new Error("Asset not found"), 400, res);
    }
    const asset = await fetchAssetById(id);
    return successHandler(asset, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const updateAsset = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return errorHandler(new Error("Asset not found"), 400, res);
    }
    const { error, message } = await validateSchema(
      UpdateAssetValidationObj,
      req.body
    );
    if (error) {
      return errorHandler(new Error(message), 400, res);
    }
    const { status, warrantyEndDate, nextServiceDate } = req.body;
    const updatedAsset = await modifyAsset(
      id,
      status,
      warrantyEndDate,
      nextServiceDate
    );
    return successHandler(updatedAsset, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return errorHandler(new Error("Asset not found"), 400, res);
    }

    const deleteAsset = await removeAsset(id);
    return successHandler(deleteAsset, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getAssetUtilizationReport = async (req, res) => {
  try {
    const result = await getAssetUtilizationReportService();
    return successHandler(result, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getUserReport = async (req, res) => {
  try {
    const result = await getAssetUtilizationReportService();
    return successHandler(result, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getHistoryByUserService = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("111", userId);
    const result = await fetchHistoryByUserService(userId);
    console.log("2222", result);
    return successHandler(result, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getHistoryByAssetService = async (req, res) => {
  try {
    const assetId = req.params.id;
    const result = await fetchHistoryByAssetService(assetId);
    return successHandler(result, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getUsers = async (req, res) => {
  try {
    const assetId = req.params.id;
    const result = await fetchUsers();
    return successHandler(result, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};
