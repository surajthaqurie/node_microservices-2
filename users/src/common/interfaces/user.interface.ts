export interface IUserUpdatePayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: string;
}

export interface IUserRegisterPayload extends IUserUpdatePayload {
  _id: string;
}

export interface IUser extends IUserUpdatePayload {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRegister {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: string;
}
