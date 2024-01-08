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
