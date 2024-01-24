import { Document } from "mongoose";

export interface IAuthDocument extends Document {
  username: string;
  email: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginPayload {
  email: string;
  password?: string;
}

export interface ISignupPayload extends ILoginPayload {
  firstName: string;
  lastName: string;
  address: string;
  username: string;
  confirmPassword?: string;
}

export interface IUpdatePayload {
  username: string;
  email: string;
}
