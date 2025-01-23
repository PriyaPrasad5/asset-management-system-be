import { verifyToken } from "../utils/auth.js";
import { errorHandler } from "../utils/responseHandler.js";

export const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.role !== requiredRole) {
        console.error(`Access denied: User does not have ${requiredRole} privileges.`);
        return errorHandler(
          new Error(`You do not have ${requiredRole.toLowerCase()} access`),
          403,
          res
        );
      }
      next();
    });
  };
};

// Specific role middlewares
export const isAdmin = verifyRole("ADMIN");
export const isManager = verifyRole("MANAGER");
export const isEmployee = verifyRole("EMPLOYEE");