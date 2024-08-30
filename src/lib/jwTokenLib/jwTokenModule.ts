import { interfaces } from "inversify";
import { Module } from "../containerLib/containerModule";
import { JWT_TYPES } from "./types";
import { JwTokenSettings } from "./jwTokenSettings";
import { JwTokenHelper } from "./jwTokenHelper";

export class JwTokenModule extends Module {
  constructor(private readonly jwtSettings: JwTokenSettings) {
    super();
  }

  protected bindModule(
    fn: (
      regis: interfaces.ContainerModuleCallBack,
    ) => interfaces.ContainerModuleCallBack,
  ): interfaces.ContainerModuleCallBack {
    return fn((bind) => {
      bind(JwTokenSettings).toConstantValue(this.jwtSettings);
      bind(JWT_TYPES.IJwTokenHelper).to(JwTokenHelper).inTransientScope();
    });
  }
}
