import {
  approveRaisedRequest,
  fetchAssetsWithinWarrantyRange,
  fetchRequest,
  fetchRequests,
  rejectRaisedRequest,
} from "../services/manager.service.js";
import { validateSchema } from "../utils/common.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import {
  ApprovalValidationObj,
  RejectRequestValidationObj,
} from "../validations/allocation.validation.js";

export const getRequests = async (req, res) => {
  try {
    const requests = await fetchRequests();
    return successHandler(requests, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const requests = await fetchRequest(requestId);
    return successHandler(requests, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, message } = await validateSchema(
      ApprovalValidationObj,
      req.body
    );
    if (error) {
      return errorHandler(new Error(message), 400, res);
    }
    const { assetId, reason } = req.body;
    const request = await approveRaisedRequest(id, assetId, reason);
    return successHandler(request, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, message } = await validateSchema(
      RejectRequestValidationObj,
      req.body
    );
    if (error) {
      return errorHandler(new Error(message), 400, res);
    }
    const { reason } = req.body;
    const request = await rejectRaisedRequest(id, reason);
    return successHandler(request, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};

export const getAssetsWithinWarrantyRange = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return errorHandler(new Error("Please Enter the Date"), 400, res);
    }

    const assets = await fetchAssetsWithinWarrantyRange(date);
    return successHandler(assets, res);
  } catch (error) {
    return errorHandler(error, 400, res);
  }
};
