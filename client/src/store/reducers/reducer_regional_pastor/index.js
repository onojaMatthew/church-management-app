import {
  ADD_REGIONAL_PASTOR_START,
  ADD_REGIONAL_PASTOR_SUCCESS,
  ADD_REGIONAL_PASTOR_FAILED,
  REGIONAL_PASTOR_LIST_START,
  REGIONAL_PASTOR_LIST_SUCCESS,
  REGIONAL_PASTOR_LIST_FAILED,
  ASSIGN_CHURCH_START,
  ASSIGN_CHURCH_SUCCESS,
  ASSIGN_CHURCH_FAILED,
  DELETE_REGIONAL_PASTOR_START,
  DELETE_REGIONAL_PASTOR_SUCCESS,
  DELETE_REGIONAL_PASTOR_FAILED,
  CHURCH_LIST_START,
  CHURCH_LIST_SUCCESS,
  CHURCH_LIST_FAILED,
  UPDATE_REGIONAL_PASTOR_START,
  UPDATE_REGIONAL_PASTOR_SUCCESS,
  UPDATE_REGIONAL_PASTOR_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  VALIDATION_ERROR,
} from "../../actions/actions_regional_pastor";

const initialState = {
  regional_pastors: [],
  regional_pastor_docs: [],
  region_church_list: [],
  regional_pastor: {},
  login_loading: false,
  login_success: false,
  add_loading: false,
  add_success: false,
  list_loading: false,
  list_success: false,
  assign_loading: false,
  assign_success: false,
  delete_loading: false,
  delete_success: false,
  church_list_loading: false,
  church_list_success: false,
  update_loading: false,
  update_suucess: false,
  filter_loading: false,
  filter_success: false,
  search_loading: false,
  search_success: false,
  error: "",
  validation_error: [],
}

export const regionalPastorReducer = (state = initialState, action) => {
  console.log(action, " the action in the regional pastor reducer")
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        login_loading: true,
        login_success: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        login_loading: false,
        login_success: true,
        regional_pastor: action.data,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        login_loading: false,
        login_success: false,
        validation_error: action.error,
        error: action.error
      }
    case ADD_REGIONAL_PASTOR_START:
      return {
        ...state,
        add_loading: true,
        add_success: false,
      }
    case ADD_REGIONAL_PASTOR_SUCCESS:
      return {
        ...state,
        add_loading: false,
        add_success: true,
        regional_pastor_docs: state.regional_pastor_docs.concat(action.data)
      }
    case ADD_REGIONAL_PASTOR_FAILED:
      return {
        ...state,
        add_loading: false,
        add_success: false,
        error: action.error,
      }
    case VALIDATION_ERROR:
      return {
        ...state,
        add_loading: false,
        add_success: false,
        validation_error: action.error
      }
    case REGIONAL_PASTOR_LIST_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case REGIONAL_PASTOR_LIST_SUCCESS:
      return {
        ...state,
        login_loading: false,
        login_success: false,
        list_loading: false,
        list_success: true,
        regional_pastors: action.data,
        regional_pastor_docs: action.data.docs
      }
    case REGIONAL_PASTOR_LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_success: false,
        error: action.error
      }
    case ASSIGN_CHURCH_START:
      return {
        ...state,
        assign_loading: true,
        assign_success: false,
      }
    case ASSIGN_CHURCH_SUCCESS:
      return {
        ...state,
        assign_loading: false,
        assign_success: true,
        regional_pastor: action.data,
      }
    case ASSIGN_CHURCH_FAILED:
      return {
        ...state,
        assign_loading: false,
        assign_success: false,
        error: action.error
      }
    case DELETE_REGIONAL_PASTOR_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case DELETE_REGIONAL_PASTOR_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        regional_pastor_docs: state.regional_pastor_docs.filter(f => f._id !== action.data._id)
      }
    case DELETE_REGIONAL_PASTOR_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error
      }
    case CHURCH_LIST_START:
      return {
        ...state,
        church_list_loading: true,
        church_list_success: false,
      }
    case CHURCH_LIST_SUCCESS:
      return {
        ...state,
        church_list_loading: false,
        church_list_success: true,
        region_church_list: action.data,
        regional_pastor_docs: action.data.docs
      }
    case CHURCH_LIST_FAILED:
      return {
        ...state,
        church_list_loading: false,
        church_list_success: false,
      }
    case UPDATE_REGIONAL_PASTOR_START:
      return {
        ...state,
        update_loading: true,
        update_success: false,
      }
    case UPDATE_REGIONAL_PASTOR_SUCCESS:
      return {
        ...state,
        update_loading: true,
        update_success: false,
        regional_pastor: action.data,
      }
    case UPDATE_REGIONAL_PASTOR_FAILED:
      return {
        ...state,
        update_loading: true,
        update_success: false,
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
        regional_pastor_docs: action.data,
        regional_pastors: action.data,
      }
    case SEARCH_FAILED:
      return {
        ...state,
        search_loading: false,
        search_success: false,
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
        regional_pastor_docs: action.data,
        regional_pastors: action.data,
      }
    case FILTER_FAILED:
      return {
        ...state,
        filter_loading: true,
        filter_success: false,
        error: action.error
      }
    default: 
      return state;
  }
}