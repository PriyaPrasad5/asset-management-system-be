import dayjs from "dayjs";
import Joi from "joi";

export const CreateAssetValidationObj = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  assetId: Joi.string().required(),
  purchaseDate: Joi.date()
    .custom((date, helper) => {
      if (!dayjs(date.original, undefined, true).isValid()) {
        return helper.message({ custom: `{{#label}} must be a valid date` });
      }
      return true;
    })
    .required(),
  warrantyEndDate: Joi.date()
    .custom((date, helper) => {
      if (!dayjs(date.original, undefined, true).isValid()) {
        return helper.message({ custom: `{{#label}} must be a valid date` });
      }
      return true;
    })
    .required(),
  // status: Joi.string().valid("AVAILABLE", "ASSIGNED", "UNDER_MAINTENANCE").optional(),
});

export const UpdateAssetValidationObj = Joi.object({
  status: Joi.string()
    .valid("AVAILABLE", "ASSIGNED", "UNDER_MAINTENANCE")
    .optional(),
  warrantyEndDate: Joi.date()
    .custom((date, helper) => {
      if (!dayjs(date.original, undefined, true).isValid()) {
        return helper.message({ custom: `{{#label}} must be a valid date` });
      }
      return true;
    })
    .optional(),
  nextServiceDate: Joi.date()
    .custom((date, helper) => {
      if (!dayjs(date.original, undefined, true).isValid()) {
        return helper.message({ custom: `{{#label}} must be a valid date` });
      }
      return true;
    })
    .optional(),
});
