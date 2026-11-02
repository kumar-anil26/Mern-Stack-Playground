import express from "express";
import helmet from "helmet";
import productRouter from "./routers/product.router.js";
import userRouter from "./routers/user.router.js";
import { errorHandler } from "./middlewares/product.middleware.js";
import { notFound } from "./middlewares/product.notFound.meddleware.js";
import { refreshAccessToken } from "./utils/refreshToken.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(helmet());

const originalURL = ["http:localhost:5173"];
app.use(cors({ origin: originalURL, Credential: true }));

//! Cookie Parser to read cookie
app.use(cookieParser());

//! Product Router
app.use("/api/product", productRouter);

//! User Router
app.use("/api/user", userRouter);

//! Refresh Token auth
app.use("/auth/refresh", refreshAccessToken);
//! Not Fund middleware
app.use(notFound);

//! Global Error handler
app.use(errorHandler);

export default app;
