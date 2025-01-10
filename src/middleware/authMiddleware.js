import { verifyToken } from "../utils/auth.js";
import { errorHandler } from "../utils/responseHandler.js";

// Admin role verification middleware
export const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "ADMIN") {
      console.error("Access denied: User does not have admin privileges.");
      return errorHandler(new Error("You do not have admin access"), 403, res);
    }
    next();
  });
};

// Manager role verification middleware
export const isManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "MANAGER") {
      console.error("Access denied: User does not have manager privileges.");
      return errorHandler(
        new Error("You do not have manager access"),
        403,
        res
      );
    }
    next();
  });
};

// Employee role verification middleware
export const isEmployee = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "EMPLOYEE") {
      console.error("Access denied: User does not have employee privileges.");
      return errorHandler(
        new Error("You do not have employee access"),
        403,
        res
      );
    }
    next();
  });
};
