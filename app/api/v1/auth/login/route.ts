import { login } from "@/lib/actions/auth.actions";
import { handleServerError } from "@/lib/actions/error.action";
import dbConnect from "@/lib/db";

import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    const user = await login({ email, password });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err: any) {
    return handleServerError(err);
  }
}
