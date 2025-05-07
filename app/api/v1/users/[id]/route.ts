import { handleServerError } from "@/lib/actions/error.action";
import { deleteUser, updateUser } from "@/lib/actions/user.actions";
import { createUserSchema } from "@/lib/validation/user.validation";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const validated = createUserSchema.parse(body);
    const { id } = await params;
    const updated = await updateUser(id, validated);

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (err: any) {
    return handleServerError(err);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // { params }: { params: { id: string } }
    const { id } = await params;
    await deleteUser(id);

    return new Response(null, { status: 204 });
  } catch (err) {
    return handleServerError(err);
  }
}
