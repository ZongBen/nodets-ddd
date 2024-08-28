import { App } from "../lib/bootstrapLib/app";
import { jwtValidHandler } from "../lib/controllerLib/jwtValidHandler";
import { MediatorModule } from "../lib/mediatorLib/mediatorModule";
import { exceptionMiddleware } from "../lib/middlewareLib/exceptionMiddleware";
import { reqMiddleware } from "../lib/middlewareLib/reqMiddleware";
import { TypeORM } from "../lib/typeORMLib/typeORM";
import { TypeORMModule } from "../lib/typeORMLib/typeORMModule";
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
});
const orm = TypeORM.createConnection({
  type: "mssql",
  host: app.env.DB_HOST,
  username: app.env.DB_USER,
  password: app.env.DB_PASSWORD,
  database: app.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: db_entities,
  options: {
    trustServerCertificate: true,
  },
});
app.regisModules(
  new MediatorModule(app.serviceContainer, HandlerMap),
  new TypeORMModule(orm),
);
app.useJsonParser();
app.useMiddleware(reqMiddleware);
app.useMiddleware(exceptionMiddleware);
app.useJwtValidMiddleware(new jwtValidHandler(app.env.JWT_SECRET).handler);
app.mapController([AuthController]);
app.run();
