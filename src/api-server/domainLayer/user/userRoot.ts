export class UserRoot {
  id: string;
  account: string;
  password: string;
  username: string;

  private constructor(
    id: string,
    account: string,
    password: string,
    username: string,
  ) {
    this.id = id;
    this.account = account;
    this.password = password;
    this.username = username;
  }

  static create(
    id: string,
    account: string,
    password: string,
    username: string,
  ): UserRoot {
    return new UserRoot(id, account, password, username);
  }
}
