import { combineReducers } from "redux";
import { account } from "./reducers_login";
import { church } from "./reducers_church";
import { role } from "./reducers_role";
import { member } from "./reducers_member";
import { category } from "./reducers_mem_category";

export const rootReducer = combineReducers({
  account,
  church,
  role,
  member,
  category,
});