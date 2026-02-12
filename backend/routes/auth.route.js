import { Router } from "express";
import * as authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.get("/register", authController.register);
authRouter.get("/login", authController.login);
authRouter.get("/logout", authController.logout);


export default authRouter;