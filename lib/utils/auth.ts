// lib/auth-utils.js
import { verifyAccessToken } from "../auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token")?.value;

  if (!accessToken) return null;

  const decoded = verifyAccessToken(accessToken);
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
