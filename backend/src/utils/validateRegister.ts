import isEmail from "validator/lib/isEmail";
import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username length must be greater than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username cannot include @",
      },
    ];
  }

  if (!isEmail(options.email)) {
    return [{ field: "email", message: "Not a valid email" }];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Password length must be greater than 2",
      },
    ];
  }

  return null;
};
