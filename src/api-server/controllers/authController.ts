import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../lib/controllerLib/baseController";

export class AuthController extends BaseController {
  apiPath: string = "/auth";

  private async register(req: Request, res: Response, next: NextFunction) {
    console.log("register");
    res.send("register");
    next();
  }

  private async error(req: Request, res: Response, next: NextFunction) {
    throw new Error("error");
  }

  mapRoutes() {
    this.router.post("/register", this.asyncWrapper(this.register));
    this.router.get("/error", this.asyncWrapper(this.error));
    return this.router;
  }
}
