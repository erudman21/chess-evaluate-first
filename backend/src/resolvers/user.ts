import {
  Mutation,
  Ctx,
  Query,
  Resolver,
  Arg,
  InputType,
  Field,
} from "type-graphql";
import bcrypt from "bcrypt";
import { COOKIE_NAME, SALT_ROUNDS } from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { UserResponse } from "./objectTypes";
import validator from "validator";
import { log } from "console";

@InputType()
export class UserInfoInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}

const loginError = {
  field: "username",
  message: "Username or password is incorrect",
};

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: any) {
    log(req);
    if (!req.session.userId) {
      return null;
    }

    return User.findOneBy({
      id: req.session.userId,
    });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("registerInput", () => UserInfoInput)
    { username, password }: UserInfoInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (process.env.__prod__ && !validator.isStrongPassword(password)) {
      return {
        errors: [loginError],
      };
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    let newUser;
    try {
      const user = User.create({
        username: username,
        password: hashedPassword,
      });
      newUser = await user.save();
    } catch (err) {
      return {
        errors: [
          {
            field: "username",
            message: "Username already exists",
          },
        ],
      };
    }

    console.log(newUser);

    req.session.userId = newUser.id;

    return { user: newUser };
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { req }: MyContext,
    @Arg("loginInput") { username, password }: UserInfoInput
  ): Promise<UserResponse> {
    const user = await User.findOneBy({ username });

    if (!user) {
      return {
        errors: [loginError],
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        errors: [loginError],
      };
    }

    log(req.session);
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);

        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
