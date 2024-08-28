import { inject, injectable } from "inversify";
import { IReqHandler } from "../../../../../lib/mediatorLib/interfaces/IReqHandler";
import { RegisterCommand } from "./registerCommand";
import { UserRepository } from "../../../../infraLayer/repositories/userRepository";
import { IUserRepository } from "../../../persistence/IUserRepository";
import { UserRoot } from "../../../../domainLayer/user/userRoot";
import { guid } from "../../../../../lib/domainLib/guid";

@injectable()
export class RegisterHandler implements IReqHandler<RegisterCommand, any> {
  constructor(
    @inject(UserRepository) private readonly _userRepository: IUserRepository,
  ) {}

  async handle(req: RegisterCommand): Promise<any> {
    const userRoot = UserRoot.create(
      guid(),
      req.account,
      req.password,
      req.userName,
    );
    const user = await this._userRepository.create(userRoot);
    return user;
  }
}
