import { IEventHandler } from "../../../../../../lib/mediatorLib/interfaces/IEventHandler";
import { INotification } from "../../../../../../lib/mediatorLib/interfaces/INotification";
import { SendNotification } from "../../../../eventHandler/loginFailed/sendNotication";

export class LoginFailedEvent implements INotification<LoginFailedEvent> {
  readonly account: string;

  constructor(account: string) {
    this.account = account;
  }

  getSubscribers(): (new (
    ...args: any[]
  ) => IEventHandler<LoginFailedEvent>)[] {
    return [SendNotification];
  }
}
