import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();
const authController = new AuthController();
authRouter.route("/signup").post(authController.signup);
authRouter.route("/login").post(authController.login);
authRouter.route("/test").get(authController.test);
authRouter.route("/:id").put(authController.login).delete(authController.deleteUser);
authRouter.route("/enable-disable/:id").patch(authController.enableDisableUser);

export default authRouter;
