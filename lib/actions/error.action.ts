"use server";
import { ZodError } from "zod";
import { CustomError } from "../utils/error";
import { NextResponse } from "next/server";

export const handleServerError = async (err: any) => {
  console.log("INTERNAL SERVER ERROR", err);
  if (err instanceof CustomError) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: err.statusCode || 400 }
    );
  }

  if (err?.code && err.code == 11000) {
    const field = Object.keys(err.keyValue);
    const code = 409;

    return NextResponse.json(
      {
        success: false,
        message: `An user with ${field} already exists.`,
      },
      { status: code }
    );
  }

  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
    const message = errors.map((error) => error.message).join("\n");
    // const message = errors
    //   .map((error) => `${error.field}: ${error.message}`)
    //   .join("\n");
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 }
    );
  }
  if (err?.name && err?.name == "TokenExpiredError") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    { status: 500 }
  );
};
