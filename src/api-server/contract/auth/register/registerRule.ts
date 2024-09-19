import { body } from "express-validator";
import { Ruler } from "../../ruler";
import { RegisterReq } from "./registerReq";

export const registerRule = new Ruler<RegisterReq>((req) => [
  body(req("account")).notEmpty().withMessage("account is required"),
  body(req("password"))
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  body(req("username")).notEmpty().withMessage("username is required"),
]);
