import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();

authRouter.route("/signup").post(new AuthController().signup);
authRouter.route("/login").post(new AuthController().login);

export default authRouter;
