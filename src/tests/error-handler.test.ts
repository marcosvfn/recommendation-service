import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middleware/error-handler";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("errorHandler Middleware", () => {
  it("should handle error with custom status code", () => {
    const error = new Error("User not found") as any;
    error.statusCode = 400;
    const req = {} as Request;
    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "User not found",
        status: 400,
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle error with default status code (500)", () => {
    const error = new Error("Unexpected error");
    const req = {} as Request;
    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "Unexpected error",
        status: 500,
      },
    });
    expect(next).not.toHaveBeenCalled();
  });
});
