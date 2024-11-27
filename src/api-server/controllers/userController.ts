import { BaseController } from "../../lib/controllerLib/baseController";
import { GetUserQuery } from "../applicationLayer/useCase/query/getUser/getUserQuery";

export class UserController extends BaseController {
  apiPath: string = "/user";

  async getUser(_req: any, res: any, next: any) {
    const { account } = res.locals.jwt;
    const query = new GetUserQuery(account);
    const ret = await this._sender.send(query);
    this.sendResult(res, ret);
    next();
  }

  mapRoutes() {
    this.router.get("/", this.action(this.getUser));
    return this.router;
  }
}
