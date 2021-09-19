import { combineReducers } from "redux";
import { account } from "./reducers_login";
import { church } from "./reducers_church";
import { role } from "./reducers_role";
import { member } from "./reducers_member";
import { category } from "./reducers_mem_category";
import { dashboard_data } from "./reducers_dashboard_data";
import { group } from "./reducers_group";
import { wedding } from "./reducers_wedding";
import { birthday } from "./reducers_birthday";
import { service } from "./reducers_service";

export const rootReducer = combineReducers({
  account,
  church,
  role,
  member,
  category,
  dashboard_data,
  group,
  wedding,
  birthday,
  service,
});