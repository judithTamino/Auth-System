import mongoose from "mongoose";
import chalk from "chalk";
import logger from "./logger.js";

import { MONGODB_URI, ATLASDB_URI, ENV } from "./env.js";

const connectToDB = async () => {
  try {
    const URI = ENV === "dev" ? MONGODB_URI : ATLASDB_URI;
    const conn = await mongoose.connect(`${URI}/auth`, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    logger.info(`DB connected successfully on ${conn.connection.host}`)

  } catch (error) {
    logger.error("DB connection error: ", error.message);
    process.exit(1);
  }
};

export default connectToDB;