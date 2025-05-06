"use server";

import { UserModel } from "@/models/user.model";
import { TLoginRequest } from "@/types/requests";
import { CustomError } from "../utils/error";
import { generateTokens, setTokenCookies } from "../auth";

const login = async ({ email, password }: TLoginRequest) => {
  // Validate credentials
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new CustomError("Invalid credentials provided", { statusCode: 400 });
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(
    user._id as string,
    user.role
  );

  // Set cookies
  await setTokenCookies({ accessToken, refreshToken });
  //   return NextResponse.json(
  //     { success: true, user: { id: user._id, role: user.role } },
  //     { status: 200 }
  //   );
};
