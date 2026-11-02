import { AppError } from "../utils/AppError.js";

export const authorize = (...roles) => {
  
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw AppError(
        403,
        "Forbidden, You are not authorized to perform this operation."
      );
    }
    next();
  };
};
