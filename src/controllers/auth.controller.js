import { loginUser, registerUser } from "../services/auth.service.js";
import { validateSchema } from "../utils/common.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import {
  LoginValidationObj,
  UserRegisterValidationObj,
} from "../validations/auth.validation.js";

export const register = async (req, res) => {
  try {
    const { error, message } = await validateSchema(
      UserRegisterValidationObj,
      req.body
    );
    if (error) {
      return errorHandler(new Error(message), 400, res);
    }

    const { name, email, password ,employeeId } = req.body;
    const user = await registerUser({ name, email, password, employeeId});
    successHandler(user, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

export const login = async (req, res) => {
  try {
    const { error, message } = await validateSchema(
      LoginValidationObj,
      req.body
    );
    if (error) {
      return errorHandler(new Error(message), 400, res);
    }

    const { email, password } = req.body;
    const token = await loginUser(email, password);
    successHandler({ token }, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};
