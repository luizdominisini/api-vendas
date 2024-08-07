import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import routes from "./routes";
import { errors } from "celebrate";
import AppError from "../errors/AppError";
import "../typeorm";
import dataSource from "../typeorm";
import uploadConfig from "../../config/upload";

const app = express();

app.use(express.json());

app.use("/files", express.static(uploadConfig.directory));

//routes
app.use(routes);

app.use(errors());

//middleware //NOTES: Ao retorna um create ou update vazio no insomnia o error response errado.
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

dataSource.initialize().then(async () => {
  console.log("🔥 DataBase On 🔥");
  app.listen(3000, () => {
    console.log("🔥 Server On Port 3000 🔥");
  });
});
