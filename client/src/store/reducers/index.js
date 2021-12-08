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
import { burial } from "./reducers_burial"; 
import { finance } from "./reducers_income";
import { expenditureReducer } from "./reducers_expenditure";
import { reportReducers } from "./reducers_reports";
import { coordinatorReducer } from "./reducers_zonal_pastor";
import { residentPastorReducer } from "./reducers_resident_pastor";
import { regionalPastorReducer } from "./reducer_regional_pastor";

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
  burial,
  finance,
  expenditureReducer,
  residentPastorReducer,
  reportReducers,
  coordinatorReducer,
  regionalPastorReducer,
});