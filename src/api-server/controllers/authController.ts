import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../lib/controllerLib/baseController";
import { inject } from "inversify";
import { MEDIATOR_TYPES } from "../../lib/mediatorLib/types";
import { ISender } from "../../lib/mediatorLib/interfaces/ISender";
import { RegisterCommand } from "../applicationLayer/useCase/command/register/registerCommand";
import { LoginCommand } from "../applicationLayer/useCase/command/login/loginCommand";

export class AuthController extends BaseController {
  apiPath: string = "/auth";

  constructor(
    @inject(MEDIATOR_TYPES.ISender) private readonly _sender: ISender,
  ) {
    super();
  }

  private async register(req: Request, res: Response, next: NextFunction) {
    const command = new RegisterCommand("account", "password", "username");
    const result = await this._sender.send(command);
    res.send(result);
    next();
  }

  private async error(req: Request, res: Response, next: NextFunction) {
    throw "error";
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    console.log("login");
    const command = new LoginCommand("account", "password");
    const reuslt = await this._sender.send(command);
    res.send(reuslt);
    next();
  }

  mapRoutes() {
    this.router.post("/register", this.action(this.register));
    this.router.post("/login", this.action(this.login));
    this.router.get("/error", this.action(this.error));
    return this.router;
  }
}
