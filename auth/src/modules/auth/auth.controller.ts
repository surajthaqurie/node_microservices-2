import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginValidation, signupValidation, updateValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constant";
import { BadRequestResponse } from "@node_helper/error-handler";
export class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = signupValidation(req.body);
      if (error) throw new BadRequestResponse(error.details[0].message);

      const user = await new AuthService().signup(value);

      return res.status(201).json({
        success: true,
        message: AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = loginValidation(req.body);
      if (error) throw new BadRequestResponse(error.details[0].message);

      const user = await new AuthService().login(value);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  test(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      message: "test",
    });
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const { error, value } = updateValidation(req.body);
      if (error) throw new BadRequestResponse(error.details[0].message);

      const user = await new AuthService().updateUser(userId, value);
      return res.status(201).json({
        success: true,
        message: AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  public async enableDisableUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await new AuthService().enableDisableUser(userId);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await new AuthService().deleteUser(userId);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }
}
