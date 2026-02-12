import mongoose from "mongoose";
import chalk from "chalk";

import { MONGODB_URI, ATLASDB_URI, ENV } from "./env.js";

const connectToDB = async () => {
  try {
    const URI = ENV === "dev" ? MONGODB_URI : ATLASDB_URI;
    await mongoose.connect(`${URI}/auth`, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    console.log(chalk.bgGreenBright(`DB connected successfully on ${ENV} mode`));

  } catch (error) {
    console.log(chalk.bgRedBright("DB connection error: ", error.message));
    process.exit(1);
  }
};

export default connectToDB;