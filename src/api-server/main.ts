import { App } from "../lib/bootstrapLib/app";
import { jwtValidHandler } from "../lib/controllerLib/jwtValidHandler";
import { exceptionMiddleware } from "../lib/middlewareLib/exceptionMiddleware";
import { reqMiddleware } from "../lib/middlewareLib/reqMiddleware";
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
  ];
});
app.useJsonParser();
app.useMiddleware(reqMiddleware);
app.useMiddleware(exceptionMiddleware);
app.useJwtValidMiddleware(new jwtValidHandler(app.env.JWT_SECRET).handler);
app.mapController([AuthController]);
app.run();
