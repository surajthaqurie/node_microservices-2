import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    const user = await new UserService().registerUser(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    const users = await new UserService().getUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  }
}
