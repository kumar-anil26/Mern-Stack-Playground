import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";
import mongoose from "mongoose";
dotenv.config();

// //! Data Base connection
// connectDB();

// app.listen(3000, () => {
//   console.log("Server running at port http://localhost:3000");
// });
const port = process.env.PORT || 3050;
const startServer = () => {
  try {
    connectDB();
    const server = app.listen(port, () => {
      console.log(
        `Server running at port no 3000 like http://localhost:${port}`
      );
    });

    const shoutDown = (signal) => {
      console.log(`${signal} receie shoutdown`);
      server.close(async () => {
        console.log("Http server closed");
        await mongoose.connection.close(false);
        console.log("Mongodb connection closed");
        process.exit(0);
      });
    };
    process.on("SIGINT", () => shoutDown("SIGINT"));
    process.on("SIGTERM", () => shoutDown("SIGTERM"));
  } catch (err) {
    console.log("Server start Up failed");
    process.exit(0);
  }
};

startServer();
