import { handleServerError } from "@/lib/actions/error.action";
import { createUser, getUsers } from "@/lib/actions/user.actions";
import dbConnect from "@/lib/db";
import { createUserSchema } from "@/lib/validation/user.validation";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validated = createUserSchema.parse(body);

    const user = await createUser(validated);
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return handleServerError(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const users = await getUsers({
      limit: parseInt(limit as string),
      page: parseInt(page as string),
    });

    return NextResponse.json(
      {
        success: true,
        ...users,
      },
      { status: 200 }
    );
  } catch (err) {
    return handleServerError(err);
  }
}
