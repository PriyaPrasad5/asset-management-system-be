import { registerUser, loginUser } from "../services/auth.service.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    successHandler(user, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    successHandler({ token }, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};
