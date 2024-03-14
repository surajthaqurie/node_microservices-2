import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginValidation, signupValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constant";
import { BadRequestResponse } from "@node_helper/error-handler";
import { Logger } from "src/utils";

export class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    const logger = Logger(AuthController.name + "-signup");
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
      logger.error(error);
      return next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const logger = Logger(AuthController.name + " -login");
    try {
      const { error, value } = loginValidation(req.body);
      if (error) throw new BadRequestResponse(error.details[0].message);

      const user = await new AuthService().login(value);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
