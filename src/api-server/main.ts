import { App } from "../lib/bootstrapLib/app";
import { jwtValidHandler } from "../lib/controllerLib/jwtValidHandler";
import { MediatorModule } from "../lib/mediatorLib/mediatorModule";
import { exceptionMiddleware } from "../lib/middlewareLib/exceptionMiddleware";
import { requestMiddleware } from "../lib/middlewareLib/requestMiddleware";
import { responseMiddleware } from "../lib/middlewareLib/responseMiddleware";
import { TypeORM } from "../lib/typeORMLib/typeORM";
import { HandlerMap } from "./applicationLayer/handlerMap";
import { AuthController } from "./controllers/authController";
import { db_entities } from "./infraLayer/dbEntities";
require("dotenv").config({ path: __dirname + "/.env" });

const app = App.createBuilder((opt) => {
  opt.allowAnonymousPath = [
    {
      path: "/auth/register",
      method: "POST",
    },
    {
      path: "/auth/error",
      method: "GET",
    },
    {
      path: "/auth/login",
      method: "POST",
    },
  ];
  opt.container = {
    autoBindInjectable: true,
  };
});
TypeORM.initDB({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  logging: false,
  entities: db_entities,
});
app.regisModules(new MediatorModule(app.serviceContainer, HandlerMap));
app.useJsonParser();
app.useMiddleware(requestMiddleware);
app.useMiddleware(exceptionMiddleware);
app.useJwtValidMiddleware(new jwtValidHandler(app.env.JWT_SECRET).handler);
app.mapController([AuthController]);
app.useMiddleware(responseMiddleware);
app.run();
