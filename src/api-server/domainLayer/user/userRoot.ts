import { CryptoService } from "../../applicationLayer/services/cryptoService";

export class UserRoot {
  account: string;
  password: string;
  username: string;

  private constructor(account: string, password: string, username: string) {
    this.account = account;
    this.password = password;
    this.username = username;
  }

  static create(account: string, password: string, username: string): UserRoot {
    return new UserRoot(account, password, username);
  }

  async isPasswordCorrect(password: string): Promise<boolean> {
    return await CryptoService.compare(password, this.password);
  }
}
