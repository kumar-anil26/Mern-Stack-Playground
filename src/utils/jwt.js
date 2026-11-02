import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.MY_ACCESS_SECRET_KEY, {
    expiresIn: process.env.ACCESS_EXPIRE_TIME || "1h",
  });
  return token;
};

export const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.MY_REFRESH_SECRET_KEY, {
    expiresIn: process.env.REFRESH_EXPIRE_TIME || "1d",
  });
  return token;
};