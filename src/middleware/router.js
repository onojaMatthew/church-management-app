import error from "../config/error";
import userRoutes from "../controller/user/router";
import roleRoutes from "../controller/role/router";

export default (app) => {
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", roleRoutes);
  app.use(error);
}