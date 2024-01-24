import { IUserUpdatePayload, IUserRegisterPayload } from "src/common/interfaces";
import { USER_MESSAGE_CONSTANT } from "../../common/constant";
import User from "./user.schema";
import { paginationQuery } from "src/common/utils";
import axios from "axios";

export class UserService {
  public async registerUser(payload: IUserRegisterPayload) {
    const user = await User.create(payload);
    if (!user) {
      return {
        success: false,
        message: USER_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER,
      };
    }
    return user;
  }

  public async getUsers(query: { page: number; pageSize: number }) {
    const pagination = paginationQuery(query.page, query.pageSize);

    // TODO: Send total records also
    return await User.find({}, null, pagination);
  }

  public async getUser(id: string) {
    const user = await User.findById(id);
    if (!user) {
      return {
        success: false,
        message: USER_MESSAGE_CONSTANT.USER_RECORD_NOT_FOUND,
      };
    }

    return user;
  }

  public async updateUser(id: string, payload: IUserUpdatePayload) {
    const user = await User.findById(id).select({ id: 1, email: 1, username: 1 });
    if (!user) throw new Error(USER_MESSAGE_CONSTANT.USER_RECORD_NOT_FOUND);

    const taken_email = await User.findOne({ email: payload.email }).select(id);
    if (taken_email && taken_email.id !== user.id) throw new Error(USER_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN);

    const taken_username = await User.findOne({ username: payload.username }).select(id);
    if (taken_username && taken_username.id !== user.id) throw new Error(USER_MESSAGE_CONSTANT.USERNAME_ALREADY_TAKEN);

    const updateUser = await User.findByIdAndUpdate(id, payload, { new: true });
    if (!updateUser) {
      return {
        success: false,
        message: USER_MESSAGE_CONSTANT.USER_RECORD_NOT_FOUND,
      };
    }

    if (user.email !== payload.email || user.username !== payload.username) {
      try {
        const { data } = await axios.put(`http://localhost:4001/api/v1/auth/${id}`, {
          email: updateUser.email,
          username: updateUser.username,
        });
        if (!data.success) {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }

    return updateUser;
  }

  public async enableDisableUser(id: string) {
    const user = await User.findById(id);
    if (!user) {
      return {
        success: false,
        message: USER_MESSAGE_CONSTANT.USER_RECORD_NOT_FOUND,
      };
    }

    const enableDisable = await User.findByIdAndUpdate(id, { isDeleted: user.isDeleted ? false : true }, { new: true });

    if (!enableDisable) {
      return {
        success: false,
        message: user.isDeleted ? USER_MESSAGE_CONSTANT.UNABLE_TO_DISABLE_USER : USER_MESSAGE_CONSTANT.UNABLE_TO_ENABLE_USER,
      };
    }

    try {
      const { data } = await axios.patch(`http://localhost:4001/api/v1/auth/enable-disable/${id}`);
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }

    return {
      message: enableDisable.isDeleted ? USER_MESSAGE_CONSTANT.USER_DISABLED_SUCCESSFULLY : USER_MESSAGE_CONSTANT.USER_ENABLED_SUCCESSFULLY,
      data: enableDisable,
    };
  }

  public async deleteUser(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return {
        success: false,
        message: USER_MESSAGE_CONSTANT.UNABLE_TO_DELETE_USER,
      };
    }

    try {
      const { data } = await axios.delete(`http://localhost:4001/api/v1/auth/${id}`);
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }

    return user;
  }
}
