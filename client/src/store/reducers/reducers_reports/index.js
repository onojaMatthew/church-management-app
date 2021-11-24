import {
  CREATE_REPORT_START,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAILED,
  REPORT_LIST_START,
  REPORT_LIST_SUCCESS,
  REPORT_LIST_FAILED,
  REPORT_DETAIL_START,
  REPORT_DETAIL_SUCCESS,
  REPORT_DETAIL_FAILED,
  CHURCH_REPORTS_START,
  CHURCH_REPORTS_SUCCESS,
  CHURCH_REPORTS_FAILED,
  COORDINATOR_REPORT_START,
  COORDINATOR_REPORT_SUCCESS,
  COORDINATOR_REPORT_FAILED,
  DELETE_REPORT_START,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAILED,
  GO_REMARK_START,
  GO_REMARK_SUCCESS,
  GO_REMARK_FAILED,
  COORDINATOR_REMARK_START,
  COORDINATOR_REMARK_SUCCESS,
  COORDINATOR_REMARK_FAILED,
} from "../../actions/actions_report";

const initialState = {
  reports: [],
  report: {},
  report_docs: [],
  create_loading: false,
  create_success: false,
  list_loading: false,
  list_success: false,
  details_loading: false,
  details_success: false,
  church_report_loading: false,
  church_report_success: false,
  coordinator_reports_loading: false,
  coordinator_reports_success: false,
  delete_loading: false,
  delete_success: false,
  remark_loading: false,
  remark_success: false,
  error: "",
}

export const reportReducers = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_REPORT_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case CREATE_REPORT_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        report_docs: state.report_docs.concat(action.data.docs),
      }
    case CREATE_REPORT_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case REPORT_LIST_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case REPORT_LIST_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        reports: action.data,
        report_docs: action.data.docs,
      }
    case REPORT_LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_success: false,
        error: action.error
      }
    case REPORT_DETAIL_START:
      return {
        ...state,
        details_loading: true,
        details_success: false,
      }
    case REPORT_DETAIL_SUCCESS:
      return {
        ...state,
        details_loading: false,
        details_success: true,
        report: action.data,
      }
    case REPORT_DETAIL_FAILED:
      return {
        ...state,
        details_loading: false,
        details_success: false,
        error: action.error,
      }
    case CHURCH_REPORTS_START:
      return {
        ...state,
        church_reports_loading: true,
        church_reports_success: false,
      }
    case CHURCH_REPORTS_SUCCESS:
      return {
        ...state,
        church_reports_loading: false,
        church_reports_success: true,
        reports: action.data,
        report_docs: action.data.docs,
      }
    case CHURCH_REPORTS_FAILED:
      return {
        ...state,
        church_reports_loading: false,
        church_reports_success: false,
        error: action.error
      }
    case COORDINATOR_REPORT_START:
      return {
        coordinator_reports_loading: true,
        coordinator_reports_success: false,
      }
    case COORDINATOR_REPORT_SUCCESS:
      return {
        coordinator_reports_loading: false,
        coordinator_reports_success: true,
        report_docs: action.data.docs,
        reports: action.data
      }
    case COORDINATOR_REPORT_FAILED:
      return {
        coordinator_reports_loading: false,
        coordinator_reports_success: false,
        error: action.error
      }
    case DELETE_REPORT_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case DELETE_REPORT_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        report_docs: state.report_docs.filter(f => f._id !== action.data._id),
      }
    case DELETE_REPORT_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.data,
      }
    case GO_REMARK_START:
      return {
        ...state,
        remark_loading: true,
        remark_success: false,
      }
    case GO_REMARK_SUCCESS:
      return {
        ...state,
        remark_loading: false,
        remark_success: true,
        report: action.data,
      }
    case GO_REMARK_FAILED:
      return {
        ...state,
        remark_loading: false,
        remark_success: false,
        error: action.error
      }
    case COORDINATOR_REMARK_START:
      return {
        ...state,
        remark_loading: true,
        remark_success: false,
      }
    case COORDINATOR_REMARK_SUCCESS:
      return {
        ...state,
        remark_loading: false,
        remark_success: true,
        report: action.data,
      }
    case COORDINATOR_REMARK_FAILED:
      return {
        ...state,
        remark_loading: false,
        remark_success: false,
        error: action.error
      }
    default:
      return state;
  }
}