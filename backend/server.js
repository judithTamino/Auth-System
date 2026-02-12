import express from "express";
import chalk from "chalk";

import { PORT } from "./config/env.js";
import connectToDB from "./config/db.config.js";

import authRouter from "./routes/auth.route.js";

const app = express();
const port = PORT || 8080;

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(chalk.bgGreenBright(`Server is running on http://localhost:${port}`));
  connectToDB();
}); 
