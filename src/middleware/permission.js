import { AccessControl } from "accesscontrol";

const ac = new AccessControl();
 
export const roles = () => {
  ac.grant("user").readOwn("user").updateOwn("user");

  ac.grant("church").createOwn("church").readOwn("church").updateOwn("church").deleteOwn("church");

  ac.grant("zonal_coordinator").extend("church").readOwn("zonal_coordinator").updateOwn("zonal_coordinator");

  ac.grant("admin").extend("user").extend("church").extend("zonal_coordinator").readOwn("admin").readAny("admin").updateOwn("admin");
  
  ac.grant("super admin").extend("user").extend("admin").extend("church").readAny("super admin").updateAny("super admin").createAny("super admin").deleteAny("super admin");

  return ac;
};
