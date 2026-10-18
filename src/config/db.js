import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.MONGO_URL;

export const connectDB = () => {
  try {
    mongoose.connect(url);
    console.log("Databse connected successfully");
  } catch (err) {
    console.log("Don't connect to the database");
  }
};
