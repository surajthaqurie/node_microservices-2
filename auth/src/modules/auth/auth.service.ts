import { ILoginPayload } from "src/common/interface";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constant";
import { Auth } from "./auth.schema";
import { BcryptHelper } from "src/common/utils";

export class AuthService {
  public async signup(reqBody: any) {
    if (reqBody.password !== reqBody.confirmPassword) throw new Error(AUTH_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);

    return "suraj";
  }

  public async login(reqBody: ILoginPayload) {
    const user = await Auth.findOne({ email: reqBody.email });
    if (!user) throw new Error(AUTH_MESSAGE_CONSTANT.INVALID_EMAIL_OR_PASSWORD);

    const passwordMatched = await new BcryptHelper().verifyPassword(user.password, reqBody.password as string);
    if (!passwordMatched) throw new Error(AUTH_MESSAGE_CONSTANT.INVALID_EMAIL_OR_PASSWORD);

    return user;
  }
}
