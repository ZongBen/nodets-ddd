import { BaseError } from "../../../baseError";

export class UserExsistError extends BaseError {
  message: string = "User already exsist";
}
