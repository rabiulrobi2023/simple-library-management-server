import { NextFunction, Request, Response } from "express";

const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = error?.name || "Something went wrong";
  if (error?.name == "ValidationError") {
    statusCode = 400;
  }
  if (error) {
    res.status(statusCode).json({
      message: message,
      success: false,
      error: error.errors,
    });
  }
};

export default globalErrorHandler;
