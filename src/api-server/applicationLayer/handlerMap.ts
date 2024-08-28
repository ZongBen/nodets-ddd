import { MediatorMap } from "../../lib/mediatorLib/mediatorMap";
import { LoginCommand } from "./useCase/command/login/loginCommand";
import { LoginHandler } from "./useCase/command/login/loginHandler";
import { RegisterCommand } from "./useCase/command/register/registerCommand";
import { RegisterHandler } from "./useCase/command/register/registerHandler";

export class HandlerMap extends MediatorMap {
  constructor() {
    super();
    this.set(RegisterCommand, RegisterHandler);
    this.set(LoginCommand, LoginHandler);
  }
}
