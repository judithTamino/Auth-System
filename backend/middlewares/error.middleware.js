import Joi from "joi";
import { ENV } from "../config/env.js";
import logger from "../config/logger.js";
import { CustomError } from "../errors/index.js";

export const errorHandler = (error, _req, res, _next) => {
  const isDev = ENV === "dev";

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error.";
  let errors = error.errors || [];

  // Mongoose Cast Error
  if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
    errors = [{
      field: error.path,
      message: `Expected ${error.kind} - Received: ${error.value}`,
      value: error.value
    }];
  }

  // MongoDB Duplicate Key Error (E11000)
  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyPattern)[0];
    message = `Duplicate value for ${field}`;
    errors = [{
      field: field,
      message: `${field} already exists`,
      value: error.keyValue[field]
    }];
  }


  // JWT Error
  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please login again."
  }

  if (error.name === "TokenExpireError") {
    statusCode = 401;
    message = "Token expired. Please login again.";
  }

  const errorResponse = {
    success: false,
    message,
    statusCode
  };

  // Include the errors array if it contains data
  if (errors.length > 0) errorResponse.errors = errors;

  // Include stack trace only in development for debugging
  if (isDev) errorResponse.stack = error.stack;

  if (statusCode >= 500)
    logger.error("Server Error: ", errorResponse);
  else logger.warn("Client Error: ", errorResponse);

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (req, res, next) => {
  const error = new CustomError(`Route ${req.originalUrl} not found`, 404);
  logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};

export default errorHandler;