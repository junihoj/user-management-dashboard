interface CustomErrorOptions {
  type?: string;
  code?: string;
  [key: string]: any; // Allow additional properties
}

export class CustomError extends Error {
  type?: string;
  code?: string;
  statusCode?: string;
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
