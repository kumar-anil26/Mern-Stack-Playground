import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import crypto from "crypto";

export const isVerifyUserAccount = async (req, res) => {
  const token = req.params.token;
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    emailVerificationToken: tokenHash,
    emailVerificationExpiresTime: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Sorry verification failed! something happened.",
    });
  }
  user.isAccountVerified = true;
  user.emailVerificationToken = null;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Account verification successfully done.",
  });
};
