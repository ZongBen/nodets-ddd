import { BaseError } from "../../../baseError";

export class LoginFailError extends BaseError {
  message: string = "Account or password is incorrect";
}
