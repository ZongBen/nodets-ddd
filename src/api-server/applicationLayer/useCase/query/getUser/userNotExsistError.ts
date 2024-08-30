import { BaseError } from "../../../baseError";

export class UserNotExsistError extends BaseError {
  message: string = "User not exsist";
}
