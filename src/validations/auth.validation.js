import Joi from "joi";

export const UserRegisterValidationObj = Joi.object({
  name: Joi.string().min(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(15).required(),
  employeeId: Joi.number().required(),
  //   role: Joi.string().valid("EMPLOYEE", "MANAGER", "ADMIN").optional(),
});

export const LoginValidationObj = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(15).required(),
});
