"use server";
import { CustomError } from "../utils/error";
import { NextResponse } from "next/server";

export const handleServerError = async (err: Error) => {
  if (err instanceof CustomError) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: err.statusCode || 400 }
    );
  }
};
