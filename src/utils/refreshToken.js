import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AppError } from "./AppError.js";
import { User } from "../models/user.model.js";
import { RefreshT } from "../models/refreshToken.model.js";

dotenv.config();
export const refreshAccessToken = async (req, res, next) => {
  // const authHeader = req?.headers?.authorization;
  // if (!authHeader) throw AppError(403, "Authorization required");
  // const token = authHeader.startsWith("Bearer")
  //   ? authHeader.split(" ")[1]
  //   : null;
  const token = req.cookies.refreshToken || null;
  if (!token) {
    throw AppError(401, "Authorization required.");
  }
  // Verify the token
  let decode;
  try {
    decode = jwt.verify(token, process.env.MY_REFRESH_SECRET_KEY);
  } catch (err) {
    throw AppError(401, "Please login again session has been expired " + err);
  }
  //check token is matches what is stored in mongoDB
  const user = await RefreshT.findOne({ user: decode.id });

  if (!user) {
    throw AppError(403, "Token reuse detected please relogin.");
  }

  const refreshTokenOfDataBase = await user.refreshToken;
   if (!refreshTokenOfDataBase) {
    throw AppError(404, "Refresh token not found");
  }
  const isMatch = token === refreshTokenOfDataBase;
  if (!isMatch) {
    throw AppError(401, "Token deleted. Please login again");
  }
  // Generate new Access token
  const newAccessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.MY_ACCESS_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({
    success: true,
    message: "New Access token generated",
    newAccessToken: newAccessToken,
  });
};
