import {
  ADD_RESIDENT_PASTOR_START,
  ADD_RESIDENT_PASTOR_SUCCESS,
  ADD_RESIDENT_PASTOR_FAILED,
  RESIDENT_PASTOR_LIST_START,
  RESIDENT_PASTOR_LIST_SUCCESS,
  RESIDENT_PASTOR_LIST_FAILED,
  ASSIGN_CHURCH_START,
  ASSIGN_CHURCH_SUCCESS,
  ASSIGN_CHURCH_FAILED,
  DELETE_RESIDENT_PASTOR_START,
  DELETE_RESIDENT_PASTOR_SUCCESS,
  DELETE_RESIDENT_PASTOR_FAILED,
  CHURCH_LIST_START,
  CHURCH_LIST_SUCCESS,
  CHURCH_LIST_FAILED,
  UPDATE_RESIDENT_PASTOR_START,
  UPDATE_RESIDENT_PASTOR_SUCCESS,
  UPDATE_RESIDENT_PASTOR_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_FAILED,
  VALIDATION_ERROR,
} from "../../actions/actions_resident_pastor";

const initialState = {
  resident_pastors: [],
  pastor_docs: [],
  church_list: [],
  resident_pastor: {},
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

export const residentPastorReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_RESIDENT_PASTOR_START:
      return {
        ...state,
        add_loading: true,
        add_success: false,
      }
    case ADD_RESIDENT_PASTOR_SUCCESS:
      return {
        ...state,
        add_loading: false,
        add_success: true,
        pastor_docs: state.pastor_docs.concat(action.data)
      }
    case ADD_RESIDENT_PASTOR_FAILED:
      return {
        ...state,
        add_loading: false,
        add_success: false,
        error: action.error
      }
    case VALIDATION_ERROR:
      return {
        ...state,
        add_loading: false,
        add_success: false,
        error: action.error,
        validation_error: action.error
      }
    case RESIDENT_PASTOR_LIST_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case RESIDENT_PASTOR_LIST_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        resident_pastors: action.data,
        pastor_docs: action.data
      }
    case RESIDENT_PASTOR_LIST_FAILED:
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
        resident_pastor: action.data,
      }
    case ASSIGN_CHURCH_FAILED:
      return {
        ...state,
        assign_loading: false,
        assign_success: false,
        error: action.error
      }
    case DELETE_RESIDENT_PASTOR_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case DELETE_RESIDENT_PASTOR_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        pastor_docs: state.pastor_docs.filter(f => f._id !== action.data._id)
      }
    case DELETE_RESIDENT_PASTOR_FAILED:
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
        church_list: action.data,
        pastor_docs: action.data.docs
      }
    case CHURCH_LIST_FAILED:
      return {
        ...state,
        church_list_loading: false,
        church_list_success: false,
      }
    case UPDATE_RESIDENT_PASTOR_START:
      return {
        ...state,
        update_loading: true,
        update_success: false,
      }
    case UPDATE_RESIDENT_PASTOR_SUCCESS:
      return {
        ...state,
        update_loading: true,
        update_success: false,
        resident_pastor: action.data,
      }
    case UPDATE_RESIDENT_PASTOR_FAILED:
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
        pastor_docs: action.data,
        resident_pastors: action.data,
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
        pastor_docs: action.data,
        resident_pastors: action.data,
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