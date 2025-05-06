import { handleServerError } from "@/lib/actions/error.action";
import { createUser } from "@/lib/actions/user.actions";
import dbConnect from "@/lib/db";
import { handleError } from "@/lib/utils";
import { createUserSchema } from "@/lib/validation/user.validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validated = createUserSchema.parse(body);

    const user = createUser(validated);
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    handleServerError(err);
  }
}
