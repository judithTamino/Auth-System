import morgan from "morgan";
import logger from "../config/logger.js";

const morganFormat = ":method :url :status :response-time ms - :res[content-length]";

const stream = { write: msg => logger.info(msg.trim()) };

// Morgan middleware for HTTP requests
export const httpLogger = morgan(morganFormat, { stream });

// Morgan middleware for errors
export const errorLogger = morgan(morganFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: {
    write: msg => logger.error(msg.trim())
  }
});