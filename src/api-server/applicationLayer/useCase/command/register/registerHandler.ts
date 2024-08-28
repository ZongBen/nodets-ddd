import { injectable } from "inversify";
import { IReqHandler } from "../../../../../lib/mediatorLib/interfaces/IReqHandler";
import { RegisterCommand } from "./registerCommand";

@injectable()
export class RegisterHandler implements IReqHandler<RegisterCommand, any> {
  async handle(req: RegisterCommand): Promise<any> {
    console.log("RegisterHandler", req);
    return "wow";
  }
}
