import ratelimit from "express-rate-limit";

export const authLimiter = ratelimit({
  windowMs: 5 * 60 * 1000,
  limit: 3,
  message: { success: false, message: "Too many times authentication attemps",time:'You can try again after 5 min.' },
});
