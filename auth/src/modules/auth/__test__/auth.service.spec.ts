import { IAuthDocument, ISignupPayload } from "../../../common/interface";
import { AUTH_MESSAGE_CONSTANT } from "../../../common/constant";
import { AuthService } from "../auth.service";
import { Auth } from "../auth.schema";
import { BcryptHelper } from "../../../common/utils";
import mongoose from "mongoose";
import axios from "axios";

jest.mock("../auth.schema");
jest.mock("axios");
jest.mock(".../../../common/utils/bcrypt");

const mockGenerateHashPassword = jest.fn().mockResolvedValue("hashedPassword");

let authService: AuthService;
const payload: ISignupPayload = {
  firstName: "dev",
  lastName: "lop",
  email: "devlop@yopmail.com",
  username: "devlop",
  password: "password123",
  confirmPassword: "password123",
  address: "KTM",
};
beforeEach(async () => {
  authService = new AuthService();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Auth service", () => {
  describe("Signup user", () => {
    it("Returns 400, when password and current password doesn't match each other", async () => {
      const payload: ISignupPayload = {
        firstName: "dev",
        lastName: "lop",
        email: "devlop@yopmail.com",
        username: "devlop",
        password: "password123",
        confirmPassword: "mismatchedpassword",
        address: "KTM",
      };

      await expect(authService.signup(payload)).rejects.toThrow(AUTH_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);
    });

    it("Returns 409, when already taken email is used for create new user", async () => {
      // mockedAuth.findOne.mockResolvedValueOnce({ email: payload.email });
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce({ email: payload.email });
      await expect(authService.signup(payload)).rejects.toThrow(AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN);
    });

    it("Returns 409, when already taken username is used for create new user", async () => {
      // mockedAuth.findOne.mockResolvedValueOnce(null);
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce(null);
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce({ username: payload.username });

      await expect(authService.signup(payload)).rejects.toThrow(AUTH_MESSAGE_CONSTANT.USERNAME_ALREADY_TAKEN);
    });

    it("Returns 400, when user is not created", async () => {
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce(null); // Simulating that email is not taken
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce(null); // Simulating that username is not taken
      jest.spyOn(BcryptHelper.prototype, "generateHashPassword").mockImplementation(mockGenerateHashPassword);

      (Auth.create as jest.Mock).mockResolvedValueOnce(null);

      await expect(authService.signup(payload)).rejects.toThrow(AUTH_MESSAGE_CONSTANT.UNABLE_SIGNUP_USER);
    });

    it("Returns 400, when unsuccessfully API call and delete the user", async () => {
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce(null).mockResolvedValueOnce(null); // Simulating that email and username are not taken
      jest.spyOn(BcryptHelper.prototype, "generateHashPassword").mockImplementation(mockGenerateHashPassword);
      const userMockPayload = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        email: payload.email,
        username: payload.username,
        password: "hashedPassword",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      };
      (Auth.create as jest.Mock).mockResolvedValueOnce([userMockPayload] as IAuthDocument[]);

      // (axios.post as jest.Mock).mockRejectedValueOnce({ message: "API Error" });
      (axios.post as jest.Mock).mockRejectedValueOnce({
        code: "ECONNREFUSED",
        message: "Connection refused",
      });
      (Auth.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

      const user = await authService.signup(payload);

      await expect(authService.signup(payload)).rejects.toThrow(AUTH_MESSAGE_CONSTANT.UNABLE_SIGNUP_USER);
      expect(Auth.findOne).toHaveBeenCalledTimes(2);
      expect(Auth.create).toHaveBeenCalledWith({
        password: "hashedPassword",
        email: "devlop@yopmail.com",
        username: "devlop",
      });
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/api/v1/users",
        expect.objectContaining({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: user.email,
          username: user.username,
          address: payload.address,
        })
      );
      expect(Auth.findByIdAndDelete).toHaveBeenCalledWith(new mongoose.Types.ObjectId().toHexString());
    });

    it("Returns 201, when user created successfully", async () => {
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce(null); // Simulating that email is not taken
      jest.spyOn(Auth, "findOne").mockResolvedValueOnce(null); // Simulating that username is not taken

      // jest.spyOn(BcryptHelper.prototype, "generateHashPassword").mockImplementation(mockGenerateHashPassword);
      (BcryptHelper.prototype.generateHashPassword as jest.Mock).mockResolvedValue("hashedPassword");

      const userMockPayload = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        email: payload.email,
        username: payload.username,
        password: "hashedPassword",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      };

      (Auth.create as jest.Mock).mockResolvedValueOnce([userMockPayload] as IAuthDocument[]);
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });

      const user = await authService.signup(payload);

      // Expectations
      expect(user).toBeDefined();
      expect(user).toEqual([userMockPayload]);
      expect(Auth.findOne).toHaveBeenCalledTimes(2);
      expect(BcryptHelper.prototype.generateHashPassword).toHaveBeenCalledWith(payload.password);
      expect(Auth.create).toHaveBeenCalledWith({
        password: "hashedPassword",
        email: "devlop@yopmail.com",
        username: "devlop",
      });
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/api/v1/users",
        expect.objectContaining({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: user.email,
          username: user.username,
          address: payload.address,
        })
      );

      expect(Auth.findByIdAndDelete).not.toHaveBeenCalled();
    });
  });
});
