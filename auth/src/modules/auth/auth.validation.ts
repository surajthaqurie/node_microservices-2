import Joi from "joi";
import { LOGIN_VALIDATION_MESSAGE_CONSTANT } from "src/common/constant";
import { ILoginPayload } from "src/common/interface";

export const loginValidation = (data: ILoginPayload): Joi.ValidationResult<ILoginPayload> => {
  const schema = Joi.object<ILoginPayload, true>({
    email: Joi.string().email().$.lowercase().trim().required().messages({
      "string.base": LOGIN_VALIDATION_MESSAGE_CONSTANT.EMAIL_MUST_BE_STRING,
    }),
    password: Joi.string().trim().required().messages({
      "string.base": LOGIN_VALIDATION_MESSAGE_CONSTANT.PASSWORD_MUST_BE_STRING,
    }),
  });

  return schema.validate(data);
};
