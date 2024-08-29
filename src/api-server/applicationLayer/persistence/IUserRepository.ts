import { UserRoot } from "../../domainLayer/user/userRoot";

export interface IUserRepository {
  create(user: UserRoot): Promise<UserRoot>;
  getByAccount(account: string): Promise<UserRoot | null>;
}
