"use server";

import { UserModel } from "@/lib/db/models/user.model";
import { TLoginRequest } from "@/types/requests";
import { generateTokens, setTokenCookies } from "../auth";
import { CustomError } from "../utils/error";

export const login = async ({ email, password }: TLoginRequest) => {
  // Validate credentials

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new CustomError("Invalid credentials provided", { statusCode: 400 });
  }

  // const isValidPassword = await bcrypt.compare(password, user.password);
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new CustomError("Invalid Credentials Provided", { statusCode: 400 });
  }
  // Generate tokens
  const { accessToken } = await generateTokens(user._id as string, user.role);

  // Set cookies
  await setTokenCookies({ accessToken });
  return user;
};
