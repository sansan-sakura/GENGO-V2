import { AppError } from "../utils/appError";
import { Request, Response, NextFunction } from "express";

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

export const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode;
  err.status = err.status || "error";
  let error = { ...err };

  error.message = err.message;

  if (error?._message?.includes("validation")) error = handleValidationErrorDB(error);

  if (err.statusCode) {
    return res.status(Number(err.statusCode)).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};
