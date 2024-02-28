import { UserService } from "src/modules/users/user.service";

export const callbackfunction = (value: { address: string; firstName: string }) => {
  // Handle the consumed value here
  console.log(`Received message: ${value}`);
  const data = {
    lastName: "abc",
    email: "abc@gmail.com",
    username: "abc",
    firstName: value.firstName,
    address: value.address,
    _id: "asdfsadfasfd",
  };
  new UserService().registerUser(data);
};

export const callbackfunction1 = (value: { address: string; firstName: string }) => {
  // Handle the consumed value here
  console.log(`Received message: ${value}`);
  const data = {
    lastName: "abc",
    email: "abc@gmail.com",
    username: "abc",
    firstName: value.firstName,
    address: value.address,
    _id: "asdfsadfasfd",
  };
  new ProfileService().registerUser(data);
};
