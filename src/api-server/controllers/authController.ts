import { NextFunction } from "express";
import { BaseController } from "../../lib/controllerLib/baseController";
import { RegisterCommand } from "../applicationLayer/useCase/command/register/registerCommand";
import { LoginCommand } from "../applicationLayer/useCase/command/login/loginCommand";
import { LoginReq } from "../contract/auth/login/loginReq";
import { RegisterReq } from "../contract/auth/register/registerReq";
import { loginRule } from "../contract/auth/login/loginRule";
import { registerRule } from "../contract/auth/register/registerRule";

export class AuthController extends BaseController {
  apiPath: string = "/auth";

  async register(req: any, res: any, next: NextFunction) {
    const { account, password, username } = req.body as RegisterReq;
    const command = new RegisterCommand({
      account,
      password,
      username
    });
    const ret = await this._sender.send(command);
    this.sendResult(res, ret);
    next();
  }

  async error(_req: any, _res: any, _next: NextFunction) {
    throw "test-error";
  }

  async login(req: any, res: any, next: NextFunction) {
    const { account, password } = req.body as LoginReq;
    const command = new LoginCommand({
      account,
      password,
    });
    const ret = await this._sender.send(command);
    this.sendResult(res, ret);
    next();
  }

  mapRoutes() {
    this.router.post(
      "/register",
      this.validate(registerRule),
      this.action(this.register),
    );
    this.router.post(
      "/login",
      this.validate(loginRule),
      this.action(this.login),
    );
    this.router.get("/error", this.action(this.error));
    return this.router;
  }
}
