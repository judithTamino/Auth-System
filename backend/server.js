import express from "express";
import chalk from "chalk";

import { PORT } from "./config/env.js";
import connectToDB from "./config/db.config.js";
import logger from "./config/logger.js";

import authRouter from "./routes/auth.route.js";

import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { httpLogger, errorLogger } from "./middlewares/morgan.middleware.js";

const app = express();
const port = PORT || 8080;

app.use(express.json());
app.use(httpLogger);
app.use(errorLogger);

// Routes
app.use("/api/auth", authRouter);

// Error Middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`)
  connectToDB();
}); 
