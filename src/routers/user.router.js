import express from "express";
import {
  loginUser,
  logout,
  uploadProfilePic,
  userCreate,
} from "../controllers/user.controller.js";
import { authLimiter } from "../middlewares/auth.ratelimiter.middleware.js";
import { userSchemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { userRegisterSchema } from "../schemas/user.schema.js";
import { upload } from "../middlewares/upload.middleware.js";
import { isVerifyUserAccount } from "../middlewares/isVerifyUserAccount.js";

const router = express.Router();
router.post(
  "/create",
  upload.single("pic"),
  userSchemaValidation(userRegisterSchema),
  userCreate
);
router.post("/login", authLimiter, loginUser);
router.post("/logout", logout);
router.post("/upload", uploadProfilePic);
router.post("/emailverification/:token", isVerifyUserAccount);

export default router;
