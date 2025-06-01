import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  const response = {
    error: {
      message: err.message || "Internal Server Error",
      status: statusCode,
    },
  };

  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  res.status(statusCode).json(response);
};
