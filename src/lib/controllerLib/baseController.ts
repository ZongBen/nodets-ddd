import { Router } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class BaseController {
  protected router: Router = Router();
  abstract apiPath: string;
  abstract mapRoutes(): Router;

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
