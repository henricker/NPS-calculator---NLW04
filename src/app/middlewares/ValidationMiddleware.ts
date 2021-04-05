import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export default (err: Error, equest: Request, response: Response, _next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.status_code).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`
  });

}