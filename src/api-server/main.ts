import { App } from "../lib/bootstrapLib/app";
import { jwtValidHandler } from "../lib/controllerLib/jwtValidHandler";
import { mediatorModule } from "../lib/mediatorLib/mediatorModule";
import { exceptionMiddleware } from "../lib/middlewareLib/exceptionMiddleware";
import { reqMiddleware } from "../lib/middlewareLib/reqMiddleware";
import { HandlerMap } from "./applicationLayer/handlerMap";
import { AuthController } from "./controllers/authController";

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
app.regisModules(new mediatorModule(app.serviceContainer, HandlerMap));
app.useJsonParser();
app.useMiddleware(reqMiddleware);
app.useMiddleware(exceptionMiddleware);
app.useJwtValidMiddleware(new jwtValidHandler(app.env.JWT_SECRET).handler);
app.mapController([AuthController]);
app.run();
