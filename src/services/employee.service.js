import db from "../models/relationshipManager.js";

const { Request, Allocation } = db;

export const saveRequest = async (userId, assetData) => {
  const { name, type } = assetData;
  const request = await Request.create({ userId, name, type, isActive: 1 });
  return request;
};

export const fetchRequest = async (userId) => {
  const request = await Request.findAll(userId, { where: { isActive: 1 } });
  return request;
};

export const removeRequest = async (id) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error("Request Not Found");
  }
  if (request.status !== "APPROVED") {
    throw new Error("Aproved Request cant be deleted");
  }
  if (request.status !== "REJECTED") {
    throw new Error("Rejected Request cant be deleted");
  }
  await request.update({ isActive: 0 });
  return request;
};

export const getHistoryByUserService = async (userId) => {
  const history = await Allocation.findAll({
    where: { userId },
    include: [{ model: Asset, attributes: ["id", "name", "type"] }],
    order: [["createdOn", "DESC"]],
  });

  return history;
};

export const getHistoryByAssetService = async (assetId) => {
  const history = await History.findAll({
    where: { assetId },
    include: [{ model: User, attributes: ["id", "name", "email"] }],
    order: [["createdOn", "DESC"]],
  });

  return history;
};
