import winston from "winston";
import path from "path";
import { ENV } from "./env.js";

const isDev = ENV === "dev";
const level = () => isDev ? "debug" : "warn";

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(info => {
    return `${info.timestamp} [${info.level}]: ${info.message}`
  })
);

const transports = [
  new winston.transports.File({
    filename: path.join("logs", "error.log"),
    level: "error",
    maxsize: 5242880, // 5mg
    maxFiles: 5,
  }),
  new winston.transports.File({
    filename: path.join("logs", "all.log"),
    maxsize: 5242880, // 5mg
    maxFiles: 5,
  }),
  new winston.transports.File({
    filename: path.join("logs", "auth.log"),
    level: "info",
    maxsize: 5242880, // 5mg
    maxFiles: 5,
  }),
];

const logger = winston.createLogger({
  level: level(),
  format: logFormat,
  transports,
});

if (isDev)
  logger.add(new winston.transports.Console({ format: consoleFormat }));

export default logger;