import Joi from "joi";

export const ApprovalValidationObj = Joi.object({
  reason: Joi.string().optional(),
  assetId: Joi.string().required(),
});

export const RejectRequestValidationObj = Joi.object({
  reason: Joi.string().optional(),
});
