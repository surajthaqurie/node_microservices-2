import { Router } from "express";
import { userRouter } from "../modules/users";

const router = Router();

router.use("/users", userRouter);

export default router;
