import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../utils/AppError.js";

dotenv.config();

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw AppError(401, "Authenication is required");
  }
  const token = authHeader.startsWith("Bearer")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    throw AppError(401, "Authenication is required");
  }
  try {
    const decode = jwt.verify(token, process.env.MY_ACCESS_SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    throw AppError(401, "Sorry! Authentication failed. Please try again...");
  }
};
