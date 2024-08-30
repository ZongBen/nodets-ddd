import jwt, { JwtPayload } from "jsonwebtoken";
import { JwTokenSettings } from "./jwTokenSettings";
import { IJwTokenHelper } from "./interfaces/IJwTokenHelper";
import { injectable } from "inversify";

@injectable()
export class JwTokenHelper implements IJwTokenHelper {
  constructor(private settings: JwTokenSettings) {}

  generateToken(payload: any): string {
    return jwt.sign(payload, this.settings.secret, this.settings.options);
  }

  verifyToken(token: string): boolean | JwtPayload {
    try {
      return jwt.verify(token, this.settings.secret) as JwtPayload;
    } catch (error) {
      return false;
    }
  }
}
