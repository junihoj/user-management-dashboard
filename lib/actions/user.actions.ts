"use server";

import { UserModel } from "@/models/user.model";
import { TLoginRequest } from "@/types/requests";
import { CustomError } from "../utils/custom-error";

const login = async ({ email, password }: TLoginRequest) => {
  // Validate credentials
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new CustomError("");
  }
};
