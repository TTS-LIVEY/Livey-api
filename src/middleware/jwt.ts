import { RequestHandler } from "express";
import { ICreateContentDto } from "../dto/content.dto";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../const";

export interface AuthStatus {
  user: { id: string };
}

export default class JWTMiddleware {
  constructor() {}
  auth: RequestHandler<unknown, unknown, unknown, unknown, AuthStatus> = (
    req,
    res,
    next
  ) => {
    try {
      const token = req.header("Authorization")!.replace("Bearer ", "");
      const { id } = verify(token, JWT_SECRET) as JwtPayload;
      console.log(`Found user id in JWT token: ${id}`);
      res.locals = {
        user: {
          id,
        },
      };

      return next();
    } catch (error) {
      if (error instanceof TypeError)
        return res
          .status(402)
          .send("Authorization hjeader is expected but got none")
          .end();
      if (error instanceof JsonWebTokenError)
        return res.status(403).send(`Forbidden token`).end();
      return res.status(500).send(`Internal server error`).end();
    }
  };
}
