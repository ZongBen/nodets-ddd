import { ValidationChain } from "express-validator";

export class Ruler<T> {
  constructor(handler: (req: (key: keyof T) => keyof T) => ValidationChain[]) {
    return handler((key: keyof T) => key);
  }
}
