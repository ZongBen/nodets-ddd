import { injectable } from "inversify";
import { IUserRepository } from "../../applicationLayer/persistence/IUserRepository";
import { UserRoot } from "../../domainLayer/user/userRoot";
import { User } from "../dbEntities/user";

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: UserRoot): Promise<UserRoot> {
    const model = new User();
    model.account = user.account;
    model.password = user.password;
    model.name = user.username;
    await model.save();
    return user;
  }

  async getByAccount(account: string): Promise<UserRoot | null> {
    const user = await User.findOneBy({ account });
    if (!user) return null;
    return UserRoot.create(user.account, user.password, user.name);
  }
}
