import { USER_MESSAGE_CONSTANT } from "../../common/constant";
import User from "./user.schema";

export class UserService {
  public async registerUser(payload: any) {
    const user = await User.create(payload);
    if (!user) {
      return {
        success: false,
        message: USER_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER,
      };
    }
    return user;
  }

  public async getUsers() {
    return await User.find({});
  }
}
