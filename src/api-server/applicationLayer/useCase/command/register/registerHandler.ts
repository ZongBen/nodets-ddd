import { inject, injectable } from "inversify";
import { IReqHandler } from "../../../../../lib/mediatorLib/interfaces/IReqHandler";
import { RegisterCommand } from "./registerCommand";
import { UserRepository } from "../../../../infraLayer/repositories/userRepository";
import { IUserRepository } from "../../../persistence/IUserRepository";
import { UserRoot } from "../../../../domainLayer/user/userRoot";
import { UserExsistError } from "./userExsistError";
import { OkResponse } from "../../../okResponse";
import { CryptoService } from "../../../services/cryptoService";
import { RegisterResult } from "./registerResult";

@injectable()
export class RegisterHandler implements IReqHandler<RegisterCommand, any> {
  constructor(
    @inject(UserRepository) private readonly _userRepository: IUserRepository,
  ) {}

  async handle(req: RegisterCommand): Promise<any> {
    const isUserExist =
      (await this._userRepository.getByAccount(req.account)) !== null;
    if (isUserExist) {
      return new UserExsistError();
    }
    const hashedPassword = await CryptoService.hash(req.password);
    const userRoot = UserRoot.create(req.account, hashedPassword, req.userName);
    const user = await this._userRepository.create(userRoot);
    return new OkResponse(new RegisterResult(user.account, user.username));
  }
}
