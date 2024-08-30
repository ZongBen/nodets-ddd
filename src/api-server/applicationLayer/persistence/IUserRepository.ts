import { IJwTokenHelper } from "../../../lib/jwTokenLib/interfaces/IJwTokenHelper";
import { UserRoot } from "../../domainLayer/user/userRoot";

export interface IUserRepository {
  create(user: UserRoot): Promise<UserRoot>;
  getByAccount(account: string): Promise<UserRoot | null>;
  getValidToken(user: UserRoot, jwt: IJwTokenHelper): Promise<string>;
}
