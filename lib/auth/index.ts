"use server";
import { TAuthTokens, TRole } from "@/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UnauthorizedError } from "../utils/error";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
// const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY =
  (process.env.ACCESS_TOKEN_EXPIRY as string) || "15m";
// const REFRESH_TOKEN_EXPIRY =
//   (process.env.REFRESH_TOKEN_EXPIRY as string) || "7d";

export const generateTokens = async (userId: string, role: string) => {
  const accessToken = jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  // const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, {
  //   expiresIn: REFRESH_TOKEN_EXPIRY,
  // });

  return { accessToken };
};

export const verifyAccessToken = async (
  token: string,
  throwError: boolean = false
) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (throwError) {
      throw error;
    }
    // console.log("VERIFY TOKEN ERROR", error);
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

export const isAuthenticated = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new UnauthorizedError("Unauthorized");
  }
  const decoded = await verifyAccessToken(token);
  if (!decoded) {
    throw new UnauthorizedError("Unauthorized");
  }
  return decoded;
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token")?.value;
  if (!accessToken) return null;

  const decoded = await verifyAccessToken(accessToken);
  if (!decoded) return null;

  return decoded as any;
};

export const protectRoute = async (allowedRoles: string[] = []) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    redirect("/dashboard?error=unauthorized");
  }

  return session;
};

export const redirectIfAuthenticated = async () => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }
};
