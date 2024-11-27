import { FailReturn } from "../../../FailReturn";
import { MESSAGE_CODES } from "../../../messageCodes";

export class LoginFailError extends FailReturn {
  constructor() {
    super(MESSAGE_CODES.ACCOUNT_OR_PASSWORD_INCORRECT);
  }
}
