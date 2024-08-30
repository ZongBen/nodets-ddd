import { Router } from "express";
import { inject, injectable } from "inversify";
import { MEDIATOR_TYPES } from "../mediatorLib/types";
import { ISender } from "../mediatorLib/interfaces/ISender";

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

  private bind(instance: any, fn: Function) {
    return fn.bind(instance);
  }

  action(fn: Function) {
    return this.asyncWrapper(this.bind(this, fn));
  }
}
