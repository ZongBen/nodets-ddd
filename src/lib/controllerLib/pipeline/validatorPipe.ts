import { injectable } from "inversify";
import { MediatorPipe } from "../../mediatorLib/mediatorPipe";

export class ValidatorPipe extends MediatorPipe {
  async handle(req: any, next: any): Promise<any> {
    console.log(req);
    console.log("validator pipe");
    return next();
  }
}
