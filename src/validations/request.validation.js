import dayjs from "dayjs";
import Joi from "joi";

export const CreateRequestValidationObj = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
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
});
