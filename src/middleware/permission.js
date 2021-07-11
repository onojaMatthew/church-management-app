import { AccessControl } from "accesscontrol";

const ac = new AccessControl();
 
export const roles = () => {
  ac.grant("user").readOwn("user").updateOwn("user");

  ac.grant("admin").extend("user").readOwn("admin").readAny("admin").updateOwn("admin");
  
  ac.grant("super admin").extend("user").extend("admin").updateAny("super admin").createAny("super admin").deleteAny("super admin").readAny("super admin");

  return ac;
};


