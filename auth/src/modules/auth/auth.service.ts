import { ILoginPayload, ISignupPayload, IUpdatePayload } from "src/common/interface";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constant";
import { Auth } from "./auth.schema";
import { BcryptHelper } from "../../common/utils";
import axios from "axios";

export class AuthService {
  public async signup(payload: ISignupPayload) {
    if (payload.password !== payload.confirmPassword) throw new Error(AUTH_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);

    const email_taken = await Auth.findOne({ email: payload.email });
    if (email_taken) throw new Error(AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN);

    const username_taken = await Auth.findOne({ email: payload.email });
    if (username_taken) throw new Error(AUTH_MESSAGE_CONSTANT.USERNAME_ALREADY_TAKEN);

    const hashPassword = await new BcryptHelper().generateHashPassword(payload.password as string);

    const user = await Auth.create({
      password: hashPassword,
      email: payload.email,
      username: payload.username,
    });

    if (!user) throw new Error(AUTH_MESSAGE_CONSTANT.UNABLE_SIGNUP_USER);

    try {
      //TODO: Microservice EVENT with transaction
      const { data } = await axios.post("http://localhost:4000/api/v1/users", {
        _id: user._id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: user.email,
        username: user.username,
        address: payload.address,
      });

      if (!data.success) {
        await Auth.findByIdAndDelete(user._id);
        throw new Error(data.message);
      }
    } catch (error) {
      await Auth.findByIdAndDelete(user._id);
      throw new Error(error.message);
    }

    return user;
  }

  public async login(payload: ILoginPayload) {
    const user = await Auth.findOne({ email: payload.email }).select({
      password: 1,
      isDeleted: 1,
    });
    if (!user) throw new Error(AUTH_MESSAGE_CONSTANT.INVALID_EMAIL_OR_PASSWORD);

    const passwordMatched = await new BcryptHelper().verifyPassword(payload.password as string, user.password);
    if (!passwordMatched) throw new Error(AUTH_MESSAGE_CONSTANT.INVALID_EMAIL_OR_PASSWORD);

    if (user.isDeleted) throw new Error(AUTH_MESSAGE_CONSTANT.DISABLED_ACCOUNT);

    return user;
  }

  public async updateUser(id: string, payload: IUpdatePayload) {
    const user = await Auth.findByIdAndUpdate(id, payload, { new: true });

    if (!user) throw new Error(AUTH_MESSAGE_CONSTANT.UNABLE_TO_UPDATE_USER);

    return user;
  }

  public async enableDisableUser(id: string) {
    const user = await Auth.findById(id);
    if (!user) throw new Error("USER_RECORD_NOT_FOUND");

    const enableDisable = await Auth.findByIdAndUpdate(id, { isDeleted: user.isDeleted ? false : true }, { new: true });
    if (!enableDisable) throw new Error(user.isDeleted ? AUTH_MESSAGE_CONSTANT.UNABLE_TO_ENABLE_USER : AUTH_MESSAGE_CONSTANT.UNABLE_TO_DISABLED_USER);

    return enableDisable;
  }

  public async deleteUser(id: string) {
    const user = await Auth.findByIdAndDelete(id);

    if (!user) throw new Error(AUTH_MESSAGE_CONSTANT.UNABLE_TO_DELETE_USER);

    return user;
  }
}
