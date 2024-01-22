import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { USER_MESSAGE_CONSTANT } from "src/common/constant";
import { userRegisterValidation, userUpdateValidation } from "./user.validation";

export class UserController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    const { error, value } = userRegisterValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
        data: null,
      });
    }

    const user = await new UserService().registerUser(value);

    return res.status(201).json({
      success: true,
      message: USER_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY,
      data: user,
    });
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    const query = {
      page: parseInt(req.query.page as string),
      pageSize: parseInt(req.query.pageSize as string),
    };

    const users = await new UserService().getUsers(query);

    return res.status(200).json({
      success: true,
      message: USER_MESSAGE_CONSTANT.USERS_FETCHED_SUCCESSFULLY,
      data: users,
    });
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    const users = await new UserService().getUser(userId);

    return res.status(200).json({
      success: true,
      message: USER_MESSAGE_CONSTANT.USER_DETAILS_FETCHED_SUCCESSFULLY,
      data: users,
    });
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    const { error, value } = userUpdateValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
        data: null,
      });
    }

    const userId = req.params.id;
    const user = await new UserService().updateUser(userId, value);

    return res.status(200).json({
      success: true,
      message: USER_MESSAGE_CONSTANT.USER_UPDATED_SUCCESSFULLY,
      data: user,
    });
  }

  public async enableDisableUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await new UserService().enableDisableUser(userId);

    return res.status(200).json({
      success: true,
      ...user,
    });
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await new UserService().deleteUser(userId);

    return res.status(200).json({
      success: true,
      message: USER_MESSAGE_CONSTANT.USER_DELETED_SUCCESSFULLY,
      data: user,
    });
  }
}
