"use server";
import { TAuthTokens, TRole } from "@/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
// const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY =
  (process.env.ACCESS_TOKEN_EXPIRY as string) || "15m";
// const REFRESH_TOKEN_EXPIRY =
//   (process.env.REFRESH_TOKEN_EXPIRY as string) || "7d";

export const generateTokens = async (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  // const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, {
  //   expiresIn: REFRESH_TOKEN_EXPIRY,
  // });

  return { accessToken };
};

export const verifyAccessToken = async (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// export const verifyRefreshToken = async (token: string) => {
//   try {
//     return jwt.verify(token, REFRESH_SECRET);
//   } catch (error) {
//     return null;
//   }
// };

export const setTokenCookies = async ({
  accessToken,
}: Pick<TAuthTokens, "accessToken">) => {
  const cookieStore = await cookies();
  cookieStore.set("token", accessToken as string, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 2, // 2 days
  });
  // if (refreshToken) {
  //   cookieStore.set("refreshToken", refreshToken as string, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //     maxAge: 60 * 60 * 24 * 7, // 7 days
  //   });
  // }
};

export const clearTokenCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

// export const authenticate =  async (req:Request) => {
//   const token = req.;

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const decoded = verifyToken(token);

//   if (!decoded) {
//     return res.status(401).json({ error: "Invalid token" });
//   }

//   req.userId = decoded.userId;
//   return handler(req, res);
// };
