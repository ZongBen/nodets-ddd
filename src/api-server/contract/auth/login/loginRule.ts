import { body } from "express-validator";
import { LoginReq } from "./loginReq";
import { Ruler } from "../../ruler";
import { INVALID_MESSAGE } from "../../invalidMessage";

export const loginRule = new Ruler<LoginReq>((req) => [
  body(req("account")).notEmpty().withMessage(INVALID_MESSAGE.ACCOUNT_IS_REQUIRED),
  body(req("password")).notEmpty().withMessage(INVALID_MESSAGE.PASSWORD_IS_REQUIRED),
]);
