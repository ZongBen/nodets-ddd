import { BaseController } from "../../lib/controllerLib/baseController";
import { GetUserQuery } from "../applicationLayer/useCase/query/getUser/getUserQuery";

export class UserController extends BaseController {
  apiPath: string = "/user";

  async getUser(_req: any, res: any, next: any) {
    const { account } = res.locals.jwtPayload;
    const query = new GetUserQuery(account);
    const result = await this._sender.send(query);
    res.locals.result = result;
    next();
  }

  mapRoutes() {
    this.router.get("/", this.action(this.getUser));
    return this.router;
  }
}
