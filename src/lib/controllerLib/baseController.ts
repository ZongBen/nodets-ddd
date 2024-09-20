import { NextFunction, Router } from "express";
import { inject, injectable } from "inversify";
import { MEDIATOR_TYPES } from "../mediatorLib/types";
import { ISender } from "../mediatorLib/interfaces/ISender";
import { validationResult } from "express-validator";

@injectable()
export abstract class BaseController {
  protected router: Router = Router();
  abstract apiPath: string;
  abstract mapRoutes(): Router;

  constructor(
    @inject(MEDIATOR_TYPES.ISender) protected readonly _sender: ISender,
  ) {}

  private asyncWrapper(fn: any) {
    return (req: any, res: any, next: any) => {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
  }

  action(fn: Function) {
    return this.asyncWrapper(fn.bind(this));
  }

  validate(rule: any) {
    return [
      rule,
      (req: any, res: any, next: NextFunction) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          res.status(400).send({
            msg: errs.array()[0].msg,
          });
          return;
        }
        next();
      },
    ];
  }
}
