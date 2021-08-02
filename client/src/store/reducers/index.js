import { combineReducers } from "redux";
import { account } from "./reducers_login";
import { church } from "./reducers_church";
import { role } from "./reducers_role";

export const rootReducer = combineReducers({
  account,
  church,
  role,
});