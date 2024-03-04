import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { USER_MESSAGE_CONSTANT } from "src/common/constant";
import { userRegisterValidation, userUpdateValidation } from "./user.validation";
import { BadRequestError, SuccessResponse } from "@node_helper/error-handler";

export class UserController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = userRegisterValidation(req.body);
      if (error) throw new BadRequestError(error.details[0].message);

      const user = await new UserService().registerUser(value);

      return res.status(201).json({
        success: true,
        message: USER_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string),
        pageSize: parseInt(req.query.pageSize as string),
      };

      const users = await new UserService().getUsers(query);

      return new SuccessResponse(USER_MESSAGE_CONSTANT.USERS_FETCHED_SUCCESSFULLY, users).sendResponse(res);
    } catch (error) {
      return next(error);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      return new SuccessResponse(USER_MESSAGE_CONSTANT.USERS_FETCHED_SUCCESSFULLY, await new UserService().getUser(req.params.id)).sendResponse(res);
    } catch (error) {
      return next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = userUpdateValidation(req.body);
      if (error) throw new BadRequestError(error.details[0].message);

      const userId = req.params.id;
      const user = await new UserService().updateUser(userId, value);
      return new SuccessResponse(USER_MESSAGE_CONSTANT.USER_UPDATED_SUCCESSFULLY, user).sendResponse(res);
    } catch (error) {
      return next(error);
    }
  }

  public async enableDisableUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await new UserService().enableDisableUser(userId);

      return res.status(200).json({
        success: true,
        ...user,
      });
    } catch (error) {
      return next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await new UserService().deleteUser(userId);

      return res.status(200).json({
        success: true,
        message: USER_MESSAGE_CONSTANT.USER_DELETED_SUCCESSFULLY,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }
}
