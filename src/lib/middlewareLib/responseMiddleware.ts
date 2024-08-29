import type { Request, Response, NextFunction } from "express";

export function responseMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { result } = res.locals;
  if (result.status != 200) {
    res.status(result.status).send(result.message);
  } else {
    res.status(result.status).send(result.data);
  }
  next();
}
