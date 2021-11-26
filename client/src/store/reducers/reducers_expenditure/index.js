import {
  CREATE_EXPENDITURE_START,
  CREATE_EXPENDITURE_SUCCESS,
  CREATE_EXPENDITURE_FAILED,
  FETCH_EXPENDITURE_START,
  FETCH_EXPENDITURE_SUCCESS,
  FETCH_EXPENDITURE_FAILED,
  UPDATE_EXPENDITURE_START,
  UPDATE_EXPENDITURE_SUCCESS,
  UPDATE_EXPENDITURE_FAILED,
  DELETE_EXPENDITURE_START,
  DELETE_EXPENDITURE_SUCCESS,
  DELETE_EXPENDITURE_FAILED,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  TOTAL_START,
  TOTAL_SUCCESS,
  TOTAL_FAILED,

} from "../../actions/actions_expenditure";

const initialState = {
  expenditures: [],
  expenditure: {},
  exp_docs: [],
  loading: false,
  success: false,
  expenditure_create_loading: false,
  expenditure_create_success: false,
  expend_list_loading: false,
  expend_list_success: false,
  expend_update_loading: false,
  expend_update_success: false,
  expend_delete_loading: false,
  expend_delete_success: false,
  search_loading: false,
  search_success: false,
  filter_loading: false,
  filter_success: false,
  error: ""
}

export const expenditureReducer = (state=initialState, action) => {
  console.log(action.data)
  switch (action.type) {
    case CREATE_EXPENDITURE_START:
      return {
        ...state,
        expenditure_create_loading: true,
        expenditure_create_success: false,
      }
    case CREATE_EXPENDITURE_SUCCESS:
      return {
        ...state,
        expenditure_create_loading: false,
        expenditure_create_success: true,
        exp_docs: state.exp_docs.concat(action.data),
      }
    case CREATE_EXPENDITURE_FAILED:
      return {
        ...state,
        expenditure_create_loading: false,
        expenditure_create_success: false,
        error: action.error
      }
    case FETCH_EXPENDITURE_START:
      return {
        ...state,
        expend_list_loading: true,
        expend_list_success: false,
      }
    case FETCH_EXPENDITURE_SUCCESS:
      return {
        ...state,
        expend_list_loading: false,
        expend_list_success: true,
        expenditures: action.data,
        exp_docs: action.data.docs,
      }
    case FETCH_EXPENDITURE_FAILED:
      return {
        ...state,
        expend_list_loading: false,
        expend_list_success: false,
        error: action.error
      }
    case UPDATE_EXPENDITURE_START:
      return {
        ...state,
        expend_update_loading: true,
        expend_update_success: false,
      }
    case UPDATE_EXPENDITURE_SUCCESS:
      return {
        ...state,
        expend_update_loading: false,
        expend_update_success: true,
        expenditure: action.data,
      }
    case UPDATE_EXPENDITURE_FAILED:
      return {
        ...state,
        expend_update_loading: false,
        expend_update_success: false,
        error: action.error
      }
    case DELETE_EXPENDITURE_START:
      return {
        ...state,
        expend_delete_loading: true,
        expend_delete_success: false,
      }
    case DELETE_EXPENDITURE_SUCCESS:
      return {
        ...state,
        expend_delete_loading: false,
        expend_delete_success: true,
        exp_docs: state.exp_docs.filter(d => d._id !== action.data._id),
      }
    case DELETE_EXPENDITURE_FAILED:
      return {
        ...state,
        expend_delete_loading: false,
        expend_delete_success: false,
        error: action.error
      }
    case FILTER_START:
      return {
        ...state,
        filter_loading: true,
        filter_success: false,
      }
    case FILTER_SUCCESS:
      return {
        ...state,
        filter_loading: false,
        filter_success: true,
        exp_docs: action.data,
        expenditures: action.data,
      }
    case FILTER_FAILED:
      return {
        ...state,
        filter_loading: false,
        filter_success: false,
        error: action.error
      }
    case SEARCH_START:
      return {
        ...state,
        search_loading: true,
        search_success: false,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        search_loading: false,
        search_success: true,
        exp_docs: action.data.docs,
        expenditures: action.data,
      }
    case SEARCH_FAILED:
      return {
        ...state,
        search_loading: false,
        search_success: false,
        error: action.error
      }
    case TOTAL_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        expenditure: action.data,
      }
    case TOTAL_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    default:
      return state;
  }
}