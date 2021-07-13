import error from "../config/error";
import userRoutes from "../controllers/user/router";
import roleRoutes from "../controllers/role/router";
import officeRoutes from "../controllers/office/router";
import churchRoutes from "../controllers/churches/router";
import mem_categoryRoutes from "../controllers/membership_category/router";

export default (app) => {
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", roleRoutes);
  app.use("/api/v1", officeRoutes);
  app.use("/api/v1", churchRoutes);
  app.use("/api/v1", mem_categoryRoutes);
  app.use(error);
}