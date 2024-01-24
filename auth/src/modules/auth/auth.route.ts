import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();

authRouter.route("/signup").post(new AuthController().signup);
authRouter.route("/login").post(new AuthController().login);

authRouter.route("/:id").put(new AuthController().login).delete(new AuthController().deleteUser);
authRouter.route("/enable-disable/:id").patch(new AuthController().enableDisableUser);

export default authRouter;
