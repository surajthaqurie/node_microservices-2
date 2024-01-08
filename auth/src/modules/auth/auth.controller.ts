import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    const user = await new AuthService().signup(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const users = await new AuthService().login(req.body);

    return res.status(200).json({
      success: true,
      data: users,
    });
  }
}
