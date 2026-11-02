import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateAccessToken } from "../utils/jwt.js";
import { RefreshT } from "../models/refreshToken.model.js";

//! Create new user
export const createUser = async (userDetails, fileDetails) => {
  const { name, email, password } = userDetails;
  console.log('File data ',fileDetails.filename);
  if (!name?.trim() || !email.trim() || !password?.trim()) {
    throw AppError(401, "All fields must be required! Please try again...");
  }
  const user = await User.create({
    ...userDetails,
    profileName: fileDetails?.filename || null,
    profileUrl: fileDetails.path || null,
  });
  if (!user) {
    throw AppError(401, "Something error! User doesn't created");
  }
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

//! Login user and generate token
export const loginUser = async (credential) => {
  const { email, password } = credential;
  if (!email || !password) {
    throw AppError(
      401,
      "Sorry! Email and password are required, Please try again..."
    );
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw AppError(401, "Sorry! User not found. Plese enter registered email.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw AppError(401, "Sorry! Wrong Credential. Please try again...");
  }
  const accessToken = await generateAccessToken({
    Id: user?._id,
    role: user?.role,
  });
  const refreshToken = await generateRefreshToken({ id: user?._id });

  const saveRefreshToken = await RefreshT.findOneAndUpdate(
    {
      user: user._id,
    },
    {
      refreshToken: refreshToken,
      user: user._id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  if (!saveRefreshToken) {
    throw AppError(
      401,
      "Sorry! Refresh Token doesn't created. Please try again..."
    );
  }
  const userObj = user.toObject();
  delete userObj.password; // Remove the password when we wil send the user details to the user
  userObj.accessToken = accessToken;
  userObj.refreshToken = refreshToken;

  return userObj;
};

//! Logout the user
export const logout = async (authHeader) => {
  const refreshT = authHeader.authorization.startsWith("Bearer")
    ? authHeader.authorization.split(" ")[1]
    : null;

  if (!refreshT) {
    throw AppError(401, "Sorry!, Please send refreshToken.");
  }
  const refreshToken = await RefreshT.findOneAndDelete({
    refreshToken: refreshT,
  });
  if (!refreshToken) {
    throw AppError(401, "Please give valid token");
  }
  return refreshToken;
};
