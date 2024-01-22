import Joi from "joi";
import { USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT } from "src/common/constant";
import { IUserRegisterPayload, IUserUpdatePayload } from "src/common/interfaces";

const userPayloadSchema = {
  firstName: Joi.string().trim().required().messages({
    "string.base": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.FIRST_NAME_MUST_BE_STRING,
    "any.required": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.FIRST_NAME_MUST_BE_REQUIRED,
  }),
  lastName: Joi.string().trim().required().messages({
    "string.base": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.LAST_NAME_NAME_MUST_BE_STRING,
    "any.required": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.LAST_NAME_NAME_MUST_BE_REQUIRED,
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    "string.base": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.EMAIL_MUST_BE_STRING,
    "any.required": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.EMAIL_MUST_BE_REQUIRED,
  }),
  username: Joi.string().lowercase().trim().required().messages({
    "string.base": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.USERNAME_MUST_BE_STRING,
    "any.required": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.USERNAME_MUST_BE_REQUIRED,
  }),

  address: Joi.string().trim().required().messages({
    "string.base": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.ADDRESS_PASSWORD_MUST_BE_STRING,
    "any.required": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.ADDRESS_PASSWORD_MUST_BE_STRING,
  }),
};

export const userRegisterValidation = (data: IUserRegisterPayload): Joi.ValidationResult<IUserRegisterPayload> => {
  const schema = Joi.object<IUserRegisterPayload, true>({
    _id: Joi.string().trim().required().messages({
      "string.base": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.ID_MUST_BE_STRING,
      "any.required": USER_PAYLOAD_VALIDATION_MESSAGE_CONSTANT.ID_MUST_BE_REQUIRED,
    }),
    ...userPayloadSchema,
  }).options({ abortEarly: false });

  return schema.validate(data);
};

export const userUpdateValidation = (data: IUserUpdatePayload): Joi.ValidationResult<IUserUpdatePayload> => {
  const schema = Joi.object<IUserUpdatePayload, true>(userPayloadSchema).options({ abortEarly: false });

  return schema.validate(data);
};

// TODO: Update error response with message and key only
