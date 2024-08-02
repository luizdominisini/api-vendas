import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import AppError from "../errors/AppError";
import "../typeorm";



const app = express();

app.use(express.json());

//routes
app.use(routes);

//middleware
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3000, () => {
  console.log("🔥 Server On 🔥");
});
