import {
  ADD_COORDINATOR_START,
  ADD_COORDINATOR_SUCCESS,
  ADD_COORDINATOR_FAILED,
  COORDINATOR_LIST_START,
  COORDINATOR_LIST_SUCCESS,
  COORDINATOR_LIST_FAILED,
  ASSIGN_CHURCH_START,
  ASSIGN_CHURCH_SUCCESS,
  ASSIGN_CHURCH_FAILED,
  DELETE_COORDINATOR_START,
  DELETE_COORDINATOR_SUCCESS,
  DELETE_COORDINATOR_FAILED,
  COORDINATING_CHURCH_LIST_START,
  COORDINATING_CHURCH_LIST_SUCCESS,
  COORDINATING_CHURCH_LIST_FAILED,
  UPDATE_COORDINATOR_START,
  UPDATE_COORDINATOR_SUCCESS,
  UPDATE_COORDINATOR_FAILED,
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
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "../../actions/actions_zonal_pastor";

const initialState = {
  coordinators: [],
  coordinator_docs: [],
  church_list: [],
  coordinator: {},
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
  loading: false,
  success: false,
  error: "",
  validation_error: [],
}

export const coordinatorReducer = (state=initialState, action) => {
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
        coordinator: action.data,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        login_loading: false,
        login_success: false,
        error: action.error
      }
    case LOGIN_FAILED:
      return {
        ...state,
        login_loading: false,
        login_success: false,
        error: action.error
      }
    case ADD_COORDINATOR_START:
      return {
        ...state,
        add_loading: true,
        add_success: false,
      }
    case ADD_COORDINATOR_SUCCESS:
      return {
        ...state,
        add_loading: false,
        add_success: true,
        coordinator_docs: state.coordinator_docs.concat(action.data)
      }
    case ADD_COORDINATOR_FAILED:
      return {
        ...state,
        add_loading: false,
        add_success: false,
        error: action.error,
      }
    case VALIDATION_ERROR:
      return {
        ...state,
        login_loading: false,
        login_success: false,
        add_loading: false,
        add_success: false,
        loading: false,
        success: false,
        validation_error: action.error,
      }
    case COORDINATOR_LIST_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case COORDINATOR_LIST_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        coordinators: action.data,
        coordinator_docs: action.data.docs
      }
    case COORDINATOR_LIST_FAILED:
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
        coordinator: action.data,
      }
    case ASSIGN_CHURCH_FAILED:
      return {
        ...state,
        assign_loading: false,
        assign_success: false,
        error: action.error
      }
    case DELETE_COORDINATOR_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case DELETE_COORDINATOR_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        coordinator_docs: state.coordinator_docs.filter(f => f._id !== action.data._id)
      }
    case DELETE_COORDINATOR_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error
      }
    case COORDINATING_CHURCH_LIST_START:
      return {
        ...state,
        church_list_loading: true,
        church_list_success: false,
      }
    case COORDINATING_CHURCH_LIST_SUCCESS:
      return {
        ...state,
        church_list_loading: false,
        church_list_success: true,
        church_list: action.data,
        coordinator_docs: action.data.docs
      }
    case COORDINATING_CHURCH_LIST_FAILED:
      return {
        ...state,
        church_list_loading: false,
        church_list_success: false,
      }
    case UPDATE_COORDINATOR_START:
      return {
        ...state,
        update_loading: true,
        update_success: false,
      }
    case UPDATE_COORDINATOR_SUCCESS:
      return {
        ...state,
        update_loading: true,
        update_success: false,
        coordinator: action.data,
      }
    case UPDATE_COORDINATOR_FAILED:
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
        coordinator_docs: action.data,
        coordinators: action.data,
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
        coordinator_docs: action.data,
        coordinators: action.data,
      }
    case FILTER_FAILED:
      return {
        ...state,
        filter_loading: true,
        filter_success: false,
        error: action.error
      }
    case FORGOT_PASSWORD_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        coordinator: action.data,
      }
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case RESET_PASSWORD_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        coordinator: action.data,
      }
    case RESET_PASSWORD_FAILED:
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