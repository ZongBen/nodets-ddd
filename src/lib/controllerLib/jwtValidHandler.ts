import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function jwtValidHandler(secret: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      res.status(401).send("Unauthorized");
      return;
    }
    token = token.slice(7, token.length);
    const payload = jwt.verify(token, secret);
    if (!payload) {
      res.status(401).send("Unauthorized");
      return;
    }
    res.locals.jwtPayload = payload;
    next();
  };
}
