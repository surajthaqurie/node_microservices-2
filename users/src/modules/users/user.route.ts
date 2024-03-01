import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.route("/").get(new UserController().getUsers);

userRouter.route("/:id").get(new UserController().getUser).put(new UserController().updateUser).delete(new UserController().deleteUser);

userRouter.route("/enable-disable/:id").patch(new UserController().enableDisableUser);

export { userRouter };
