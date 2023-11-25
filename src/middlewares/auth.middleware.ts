import { NextFunction, Request, Response } from "express";
import { JWE } from "../utils/jwe.utils";
import dayjs from "dayjs";
import { ApiError } from "../types/api-error.types";

export type JwtPayload = {
  id: string;
  exp: number;
};

export class AuthMiddleware {
  async middleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ApiError(`Não autorizado`, 401);
    }

    const token = authorization.split("Bearer ")[1];

    try {
      const { id, iat, exp } = await new JWE().decrypt(token);
      if (
        !id ||
        !iat ||
        !exp ||
        exp < dayjs().unix() ||
        iat > dayjs().unix() ||
        typeof id !== "number"
      ) {
        throw new ApiError(`Não autorizado`, 401);
      }
      res.locals.id = id;
    } catch (error) {
      throw new ApiError(`Não autorizado`, 401);
    }

    next();
  }
}
