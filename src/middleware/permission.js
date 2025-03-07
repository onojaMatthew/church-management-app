import { AccessControl } from "accesscontrol";

const ac = new AccessControl();
 
export const roles = () => {
  ac.grant("user").readOwn("user").updateOwn("user");
  ac.grant("church").createOwn("church").readOwn("church").updateOwn("church").deleteOwn("church");
  ac.grant("resident pastor").extend("church").readOwn("resident pastor").updateOwn("resident pastor");
  ac.grant("zonal pastor").extend("church").extend("resident pastor").readOwn("zonal pastor").updateOwn("zonal pastor");
  ac.grant("regional pastor").extend("church").extend("zonal pastor").extend("resident pastor").readOwn("regional pastor").updateOwn("regional pastor");
  ac.grant("admin").extend("user").extend("church").extend("zonal pastor").readOwn("admin").readAny("admin").updateOwn("admin");
  ac.grant("super admin").extend("regional pastor").extend("church").extend("zonal pastor").extend("resident pastor").extend("user").extend("admin").readAny("super admin").updateAny("super admin").createAny("super admin").deleteAny("super admin");

  return ac;
};
