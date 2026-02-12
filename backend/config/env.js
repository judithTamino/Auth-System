import { config } from "dotenv";

config({
  path: "../.env",
  quiet: true
});

export const {ENV, PORT, FRONTEND_URL, MONGODB_URI, ATLASDB_URI } = process.env;