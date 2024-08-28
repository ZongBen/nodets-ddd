import { interfaces } from "inversify";
import { Module } from "../containerLib/containerModule";
import { DataSource } from "typeorm";
import { TYPE_ORM_TYPES } from "./types";

export class TypeORMModule extends Module {
  constructor(private dataSource: DataSource) {
    super();
  }

  protected bindModule(
    fn: (
      regis: interfaces.ContainerModuleCallBack,
    ) => interfaces.ContainerModuleCallBack,
  ): interfaces.ContainerModuleCallBack {
    return fn((bind) => {
      bind<DataSource>(TYPE_ORM_TYPES.PROVIDER).toConstantValue(
        this.dataSource,
      );
    });
  }
}
