import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { AuthError } from "../services/auth.service.js";

export class AppError extends Error {
  constructor(
    message: string,
    readonly statusCode = 500,
    readonly code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof AuthError) {
    res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      error: "Invalid input.",
      details: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  console.error("[error]", error);
  res.status(500).json({ error: "Something went wrong." });
}
