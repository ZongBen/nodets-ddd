import { injectable } from "inversify";
import { IEventHandler } from "../../../../lib/mediatorLib/interfaces/IEventHandler";
import { LoginFailedEvent } from "../../useCase/command/login/events/loginFailedEvent";

@injectable()
export class SendNotification implements IEventHandler<LoginFailedEvent> {
  async handle(event: LoginFailedEvent): Promise<void> {
    console.log("SendNotification", event);
  }
}
