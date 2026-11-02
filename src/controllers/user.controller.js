import * as userService from "../services/user.service.js";
import { sendEmailVerification } from "../utils/sendEmailVerifiction.js";

export const userCreate = async (req, res) => {
  const userData = req.body;
  const user = await userService.createUser(req.body, req.file);
  const isVerify =await sendEmailVerification(user);
  console.log("verifictin status ", isVerify);
  if (isVerify) {
    res.status(201).json({
      success: true,
      message:
        "User Created successfully and verification eamil is send your registered email address.",
      User: isVerify,
    });
  }
};

//! Login user and generate token
export const loginUser = async (req, res) => {
  const user = await userService.loginUser(req.body);
  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "User Login successfully",
    userDetails: user,
  });
};

//! Logout user and delete the refreshToken
export const logout = async (req, res, next) => {
  const result = await userService.logout(req.headers);
  res.status(200).json({
    success: true,
    message: "User logout successful and deleted the refresh token",
    result,
  });
};

//! Upload file
export const uploadProfilePic = async (req, res) => {
  console.log(req.file);
  res.status(200).json({
    success: true,
    message: "File upload successfully.",
  });
};
