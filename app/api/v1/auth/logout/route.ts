import { login } from "@/lib/actions/auth.actions";
import { handleServerError } from "@/lib/actions/error.action";
import dbConnect from "@/lib/db";

import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const nextResponse = NextResponse.json(
      { success: true, message: "logged out successfully" },
      { status: 200 }
    );

    nextResponse.headers.append(
      "Set-Cookie",
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
    );

    return nextResponse;
  } catch (err: any) {
    return handleServerError(err);
  }
}
