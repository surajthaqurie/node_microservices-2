import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AuthController } from "../auth.controller";
import { signupValidation } from "../auth.validation";

import { ISignupPayload } from "src/common/interface";
import { AuthService } from "../auth.service";
import { AUTH_MESSAGE_CONSTANT } from "../../../common/constant";
// import Joi from "joi";

jest.mock("../auth.validation");
jest.mock("../auth.service");

let authController: AuthController;
let mockReq: Request;
let mockRes: Response;
let mockNext: NextFunction;

const payload: ISignupPayload = {
  firstName: "dev",
  lastName: "lop",
  email: "devlop@yopmail.com",
  username: "devlop",
  password: "password123",
  confirmPassword: "password123",
  address: "KTM",
};

beforeEach(() => {
  authController = new AuthController();
  mockReq = {} as Request;
  mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  mockNext = jest.fn() as NextFunction;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Auth controller", () => {
  describe("Signup User", () => {
    // it("Returns 400, when signup payload is invalidated", async () => {
    // const userMockPayload = {
    //   firstName: "", // here invalid firstName
    //   lastName: "lop",
    //   email: "devlop@yopmail.com",
    //   username: "devlop",
    //   password: "password123",
    //   confirmPassword: "password123",
    //   address: "KTM",
    // };

    // const result = signupValidation(userMockPayload);

    // const mockRequest = (mockReq.body = {} as Request);

    // authController.signup(mockRequest, mockRes, mockNext);

    // expect(result.error).toBeDefined();
    // expect(result.value).toBeUndefined();
    // expect(mockRes.status).toHaveBeenCalledWith(400);
    // expect(mockRes.json).toHaveBeenCalledWith({
    //   success: false,
    //   message: validationResult.error?.message,
    //   data: null,
    // });
    // });

    it("Returns 201, when user signup successfully", async () => {
      (signupValidation as jest.Mock).mockReturnValueOnce({
        error: null,
        value: payload,
      });

      const userMockPayload = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        email: payload.email,
        username: payload.username,
        password: "hashedPassword",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      };

      (AuthService as jest.Mock).mockImplementationOnce(() => ({
        signup: jest.fn().mockResolvedValueOnce(userMockPayload),
      }));

      await authController.signup(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY,
        data: userMockPayload,
      });
    });
  });
});
