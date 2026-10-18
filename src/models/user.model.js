import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { boolean } from "zod";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email must be required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
    },
    role: {
      type: String,
      enum: ["admin", "manager"],
      default: "admin",
    },
    profileName: {
      type: String,
      default: null,
    },
    profileUrl: {
      type: String,
      default: null,
    },
    isAccountVerified: {
      type: boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationExpiresTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified(this.password)) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next;
});

export const User = mongoose.model("User", userSchema);
