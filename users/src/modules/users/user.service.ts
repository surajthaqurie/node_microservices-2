import { USER_MESSAGE_CONSTANT } from "../../common/constant";
import User from "./user.schema";

export class UserService {
  public async registerUser(reqBody: any) {
    if (reqBody.password !== reqBody.confirmPassword) throw new Error(USER_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);

    return "suraj";
  }

  public async getUsers() {
    return await User.find();
  }
}
