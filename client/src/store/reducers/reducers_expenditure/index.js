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
} from "../../actions/actions_expenditure";

const initialState = {
  expenditures: [],
  expenditure: {},
  docs: [],
  expenditure_create_loading: false,
  expenditure_create_success: false,
  expend_list_loading: false,
  expend_list_success: false,
  expend_update_loading: false,
  expend_update_success: false,
  expend_delete_loading: false,
  expend_delete_success: false,
  error: ""
}

export const expenditureReducer = (state=initialState, action) => {
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
        expenditures: state.expenditures.concat(action.data),
        docs: state.docs.concat(action.data.docs),
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
        docs: action.data.docs,
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
        docs: state.docs.filter(d => d._id !== action.data._id),
      }
    case DELETE_EXPENDITURE_FAILED:
      return {
        ...state,
        expend_delete_loading: false,
        expend_delete_success: false,
        error: action.error
      }
    default:
      return state;
  }
}