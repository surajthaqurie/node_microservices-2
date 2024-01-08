import Joi from "joi";
import { AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT } from "../../common/constant";
import { ILoginPayload, ISignupPayload } from "src/common/interface";

export const loginValidation = (data: ILoginPayload): Joi.ValidationResult<ILoginPayload> => {
  const schema = Joi.object<ILoginPayload, true>({
    email: Joi.string().email().lowercase().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.EMAIL_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.EMAIL_MUST_BE_REQUIRED,
    }),
    password: Joi.string().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.PASSWORD_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.PASSWORD_MUST_BE_REQUIRED,
    }),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

export const signupValidation = (data: ISignupPayload) => {
  const schema = Joi.object<ISignupPayload, true>({
    firstName: Joi.string().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.FIRST_NAME_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.FIRST_NAME_MUST_BE_REQUIRED,
    }),
    lastName: Joi.string().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.LAST_NAME_NAME_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.LAST_NAME_NAME_MUST_BE_REQUIRED,
    }),
    email: Joi.string().email().lowercase().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.EMAIL_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.EMAIL_MUST_BE_REQUIRED,
    }),
    username: Joi.string().lowercase().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.USERNAME_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.USERNAME_MUST_BE_REQUIRED,
    }),
    password: Joi.string().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.PASSWORD_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.PASSWORD_MUST_BE_REQUIRED,
    }),
    confirmPassword: Joi.string().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.CONFIRM_PASSWORD_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.CONFIRM_PASSWORD_MUST_BE_STRING,
    }),
    address: Joi.string().trim().required().messages({
      "string.base": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.ADDRESS_PASSWORD_MUST_BE_STRING,
      "any.required": AUTH_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.ADDRESS_PASSWORD_MUST_BE_STRING,
    }),
  }).options({ abortEarly: false });

  return schema.validate(data);
};
