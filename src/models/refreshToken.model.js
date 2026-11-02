import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique:true
    },
    ipAddress: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 2 * 24 * 60 * 60, // Authomatically delete by the mongoDB after 2 days.
    },
  },
  {
    timestamps: true,
  }
);

export const RefreshT = mongoose.model("RefreshT", refreshTokenSchema);
