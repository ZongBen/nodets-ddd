import { BaseReturn } from "../../lib/applicationLib/baseReturn";

export class FailReturn extends BaseReturn {
  isSuccess: boolean = false;
  messageCode: string;
  data: any;

  constructor(messageCode: string, data: any = null) {
    super();
    this.messageCode = messageCode;
    this.data = data;
  }
}
