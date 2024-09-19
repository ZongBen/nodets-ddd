import { body } from "express-validator";
import { LoginReq } from "./loginReq";
import { Ruler } from "../../ruler";

export const loginRule = new Ruler<LoginReq>((req) => [
  body(req("account")).notEmpty().withMessage("account is required"),
  body(req("password")).notEmpty().withMessage("password is required"),
]);
