import { BaseReturn } from "../../lib/applicationLib/baseReturn";
import { MESSAGE_CODES } from "./messageCodes";

export class SuccessReturn extends BaseReturn {
  isSuccess = true;
  messageCode = MESSAGE_CODES.SUCCESS;
  data: any;

  constructor(data: any) {
    super();
    this.data = data;
  }
}
