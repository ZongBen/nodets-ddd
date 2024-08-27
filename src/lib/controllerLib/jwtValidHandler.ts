import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class jwtValidHandler {
  private _secret: string;

  constructor(secret: string) {
    this._secret = secret;
  }

  handler = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      res.status(401).send("Unauthorized");
      return;
    }
    token = token.slice(7, token.length);
    const payload = jwt.verify(token, this._secret);
    if (!payload) {
      res.status(401).send("Unauthorized");
      return;
    }
    res.locals.jwtPayload = payload;
    next();
  };
}
