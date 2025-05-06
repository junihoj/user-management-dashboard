import { NextResponse } from "next/server";

interface CustomErrorOptions {
  type?: string;
  code?: string;
  statusCode?: number;
  [key: string]: any; // Allow additional properties
}

export class CustomError extends Error {
  type?: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;

  constructor(message: string, options?: CustomErrorOptions) {
    super(message);
    this.name = "CustomError";
    this.type = options?.type;
    this.code = options?.code;

    // Capture stack trace (excluding constructor call from it)
    Error.captureStackTrace(this, this.constructor);

    // Add any additional details
    if (options) {
      const { type, code, ...rest } = options;
      this.details = rest;
    }
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized", details?: Record<string, unknown>) {
    super(message, { statusCode: 401 });
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = "Forbidden", details?: Record<string, unknown>) {
    super(message, { statusCode: 403 });
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Not found", details?: Record<string, unknown>) {
    super(message, { statusCode: 404 });
  }
}

export class BadRequestError extends CustomError {
  constructor(message = "Not found", details?: Record<string, unknown>) {
    const options = details
      ? { statusCode: 404, details }
      : { statusCode: 404 };
    super(message, options);
  }
}

// ERROR HANDLING FUNCTION

export const handleServerError = (err: Error) => {
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
