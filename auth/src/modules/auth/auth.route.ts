import { Router } from "express";
import { AuthController } from "./auth.controller";

const userRouter = Router();

userRouter.route("/signup").post(new AuthController().signup);
userRouter.route("/login").post(new AuthController().login);

export default userRouter;
