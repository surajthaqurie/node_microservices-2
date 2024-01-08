import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginValidation, signupValidation } from "./auth.validation";

export class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    const { error, value } = signupValidation(req.body);
    if (error) {
      return res.status(200).json({
        success: true,
        data: error,
      });
    }

    const user = await new AuthService().signup(value);

    return res.status(201).json({
      success: true,
      data: user,
    });
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const { error, value } = loginValidation(req.body);
    if (error) {
      return res.status(200).json({
        success: true,
        data: error,
      });
    }

    const users = await new AuthService().login(value);

    return res.status(200).json({
      success: true,
      data: users,
    });
  }
}
