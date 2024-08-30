import { App } from "../lib/bootstrapLib/app";
import { jwtValidHandler } from "../lib/controllerLib/jwtValidHandler";
import { JwTokenModule } from "../lib/jwTokenLib/jwTokenModule";
import { JwTokenSettings } from "../lib/jwTokenLib/jwTokenSettings";
import { MediatorModule } from "../lib/mediatorLib/mediatorModule";
import { exceptionMiddleware } from "../lib/middlewareLib/exceptionMiddleware";
import { requestMiddleware } from "../lib/middlewareLib/requestMiddleware";
import { responseMiddleware } from "../lib/middlewareLib/responseMiddleware";
import { TypeORM } from "../lib/typeORMLib/typeORM";
import { HandlerMap } from "./applicationLayer/handlerMap";
import { controllers } from "./controllers";
import { db_entities } from "./infraLayer/dbEntities";
require("dotenv").config({ path: __dirname + "/.env" });

const app = App.createBuilder((opt) => {
  opt.allowAnonymousPath = [
    {
      path: "/auth/*",
      method: "^GET|POST|PUT|DELETE|PATCH$",
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
app.regisModules(
  new MediatorModule(app.serviceContainer, HandlerMap),
  new JwTokenModule(
    new JwTokenSettings(app.env.JWT_SECRET, {
      expiresIn: app.env.JWT_EXPIRES_IN,
    }),
  ),
);
app.useJsonParser();
app.useMiddleware(requestMiddleware);
app.useJwtValidMiddleware(jwtValidHandler(app.env.JWT_SECRET));
app.mapController(controllers);
app.useMiddleware(responseMiddleware);
app.useMiddleware(exceptionMiddleware);
app.run();
