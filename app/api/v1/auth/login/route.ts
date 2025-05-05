import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
  } catch (err) {}
}
