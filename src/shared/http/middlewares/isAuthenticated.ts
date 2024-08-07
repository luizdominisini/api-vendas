/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../../../config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
//Verifica se no cabeçalho existe algum token.
function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing?");
  }

  //BEARER & TOKEN// O RETORNO DE AUTHHEADER É UMA STRING SEPARA POR ESPAÇO APENAS.// Posição 0: BARER, Posição 1: Token
  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token");
  }
}

export default isAuthenticated;
