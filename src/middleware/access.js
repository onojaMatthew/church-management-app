import { error } from "../config/response";
import { roles } from "./permission";

export const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      console.log(req.user)
      const permission = roles().can(req.user && req.user.role && req.user.role.role_name)[action](resource);
      if (!permission.granted) {
        return res.status(401).json(error("You don't have enough permission to perform this action", res.statusCode));
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
 