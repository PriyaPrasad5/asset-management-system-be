import {
  fetchRequest,
  getHistoryByAssetService,
  getHistoryByUserService,
  removeRequest,
  saveRequest,
} from "../services/employee.service.js";
import { validateSchema } from "../utils/common.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import { CreateRequestValidationObj } from "../validations/request.validation.js";

export const createRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { error, message } = await validateSchema(
      CreateRequestValidationObj,
      req.body
    );
    if (error) {
      return errorHandler(new Error(message), 400, res);
    }
    const { name, type } = req.body;
    const request = await saveRequest(userId, { name, type });
    return successHandler(request, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await fetchRequest(userId);
    return successHandler(requests, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return errorHandler(new Error("Request not found"), 400, res);
    }

    const deleteRequest = await removeRequest(id);
    return successHandler(deleteRequest, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.user.id;
    const history = await getHistoryByUserService(userId);
    return successHandler(history, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getHistoryByAsset = async (req, res) => {
  try {
    const { assetId } = req.params;

    const history = await getHistoryByAssetService(assetId);
    return successHandler(history, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};
