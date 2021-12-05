import error from "../config/error";
import userRoutes from "../controllers/user/router";
import roleRoutes from "../controllers/role/router";
import officeRoutes from "../controllers/office/router";
import churchRoutes from "../controllers/churches/router";
import mem_categoryRoutes from "../controllers/membership_category/router";
import memberRoutes from "../controllers/member/router";
import groupRoutes from "../controllers/groups/router";
import serviceRoutes from "../controllers/service/router";
import birthdayRoutes from "../controllers/birthday/router";
import weddingRoutes from "../controllers/wedding/router";
import burialRoutes from "../controllers/burial/router";
import fin_categoryRoutes from "../controllers/fincategory/router";
import financeRoutes from "../controllers/finance/router";
import expenditureRoutes from "../controllers/expenditure/router";
import coordinatorRoutes from "../controllers/zonal_pastor/router";
import reportRoutes from "../controllers/report/router";
import pastorRoutes from "../controllers/resident_pastor/router";
import zonalPastorRoutes from "../controllers/zonal_pastor/router";
import regionalPastorRoutes from "../controllers/regional_pastor/router";

export default (app) => {
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", roleRoutes);
  app.use("/api/v1", officeRoutes);
  app.use("/api/v1", churchRoutes);
  app.use("/api/v1", mem_categoryRoutes);
  app.use("/api/v1", memberRoutes);
  app.use("/api/v1", groupRoutes);
  app.use("/api/v1", serviceRoutes);
  app.use("/api/v1", birthdayRoutes);
  app.use("/api/v1", weddingRoutes);
  app.use("/api/v1", burialRoutes);
  app.use("/api/v1", fin_categoryRoutes);
  app.use("/api/v1", financeRoutes);
  app.use("/api/v1", expenditureRoutes);
  app.use("/api/v1", coordinatorRoutes);
  app.use("/api/v1", reportRoutes);
  app.use("/api/v1", pastorRoutes);
  app.use("/api/v1", zonalPastorRoutes);
  app.use(error);
};