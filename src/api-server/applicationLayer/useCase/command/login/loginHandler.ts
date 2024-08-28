import { inject, injectable } from "inversify";
import { IReqHandler } from "../../../../../lib/mediatorLib/interfaces/IReqHandler";
import { LoginCommand } from "./loginCommand";
import { MEDIATOR_TYPES } from "../../../../../lib/mediatorLib/types";
import { IPublisher } from "../../../../../lib/mediatorLib/interfaces/IPublisher";
import { LoginFailedEvent } from "./events/loginFailedEvent";

@injectable()
export class LoginHandler implements IReqHandler<LoginCommand, any> {
  constructor(
    @inject(MEDIATOR_TYPES.IPublisher) private _publisher: IPublisher,
  ) {}

  async handle(req: LoginCommand): Promise<any> {
    console.log("LoginHandler", req);
    this._publisher.publish(new LoginFailedEvent(req.account));
    return "wow";
  }
}
