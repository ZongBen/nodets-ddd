import { FailReturn } from "../../../FailReturn";
import { MESSAGE_CODES } from "../../../messageCodes";

export class UserNotExsistError extends FailReturn {
  constructor() {
    super(MESSAGE_CODES.USER_NOT_EXISTS);
  }
}
