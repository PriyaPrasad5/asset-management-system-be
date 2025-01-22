import db from "../models/relationshipManager.js";

const { Request, Allocation } = db;

export const saveRequest = async (userId, assetData) => {
  const { name, type } = assetData;
  const request = await Request.create({ userId, name, type, isActive: 1 });
  return request;
};

export const fetchRequest = async (userId) => {
  const request = await Request.findAll({
    where: { isDeleted: 0, userId: userId },
  });
  return request;
};

export const removeRequest = async (id) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error("Request Not Found");
  }
  if (request.status === "APPROVED") {
    throw new Error("Aproved Request cant be deleted");
  }
  if (request.status === "REJECTED") {
    throw new Error("Rejected Request cant be deleted");
  }
  await request.update({ isActive: 0, isDeleted: 1 });
  return request;
};
