import { ILoginPayload, ISignupPayload } from "src/common/interface";
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

    const passwordMatched = await new BcryptHelper().verifyPassword(user.password, payload.password as string);
    if (!passwordMatched) throw new Error(AUTH_MESSAGE_CONSTANT.INVALID_EMAIL_OR_PASSWORD);

    if (user.isDeleted) throw new Error(AUTH_MESSAGE_CONSTANT.DISABLED_ACCOUNT);

    return user;
  }
}
