import { body } from "express-validator";
import { LoginReq } from "./loginReq";

const key = (key: keyof LoginReq) => key;

export const loginRule = [
  body(key("account")).notEmpty().withMessage("account is required"),
];
