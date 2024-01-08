import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.route("/").post(new UserController().registerUser).get(new UserController().getUsers);

export default userRouter;
