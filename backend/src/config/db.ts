import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-auth";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
