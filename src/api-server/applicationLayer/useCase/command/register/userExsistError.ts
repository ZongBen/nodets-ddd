import { FailReturn } from "../../../FailReturn";
import { MESSAGE_CODES } from "../../../messageCodes";

export class UserExsistError extends FailReturn {
  constructor() {
    super(MESSAGE_CODES.USER_ALREADY_EXISTS);
  }
}
