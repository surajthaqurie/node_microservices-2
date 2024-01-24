import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginValidation, signupValidation, updateValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constant";

export class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    const { error, value } = signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
        data: null,
      });
    }

    const user = await new AuthService().signup(value);

    return res.status(201).json({
      success: true,
      message: AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY,
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

    const user = await new AuthService().login(value);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const { error, value } = updateValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
        data: null,
      });
    }

    const user = await new AuthService().updateUser(userId, value);
    return res.status(201).json({
      success: true,
      message: AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY,
      data: user,
    });
  }

  public async enableDisableUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await new AuthService().enableDisableUser(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await new AuthService().deleteUser(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }
}
