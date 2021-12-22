import {
  ALL_CHURCH_START,
  ALL_CHURCH_SUCCESS,
  ALL_CHURCH_FAILED,
  CREATE_CHURCH_START,
  CREATE_CHURCH_SUCCESS,
  CREATE_CHURCH_FAILED,
  CHURCH_LOGIN_START,
  CHURCH_LOGIN_SUCCESS,
  CHURCH_LOGIN_FAILED,
  CHURCH_DETAILS_START,
  CHURCH_DETAILS_SUCCESS,
  CHURCH_DETAILS_FAILED,
  ALL_CHURCH_LIST_START,
  ALL_CHURCH_LIST_SUCCESS,
  ALL_CHURCH_LIST_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_FAILED,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED,
  VALIDATION_ERROR,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "../../actions/actions_church";

const initialState = {
  churches: [],
  church_docs: [],
  church: {},
  postLoading: false,
  postSuccess: false,
  allLoading: false,
  allSuccess: false,
  loginLoading: false,
  loginSuccess: false,
  allListSuccess: false,
  allListLoading: false,
  church_details_loading: false,
  chruch_details_success: false,
  search_loading: false,
  search_success: false,
  filter_loading: false,
  filter_success: false,
  delete_loading: false,
  delete_success: false,
  loading: false,
  success: false,
  error: "",
  validation_error: [],
}

export const church = (state=initialState, action) => {
  switch (action.type) {
    case ALL_CHURCH_START:
      return {
        ...state,
        allLoading: true,
        allSuccess: false,
      }
    case ALL_CHURCH_SUCCESS:
      return {
        ...state,
        allLoading: false,
        allSuccess: true,
        churches: action.data,
        church_docs: action.data.docs,
      }
    case ALL_CHURCH_FAILED:
      return {
        ...state,
        allLoading: false,
        allSuccess: false,
        error: action.error
      }
    case CREATE_CHURCH_START:
      return {
        ...state,
        postLoading: true,
        postSuccess: false,
      }
    case CREATE_CHURCH_SUCCESS:
      return {
        ...state,
        postLoading: false,
        postSuccess: true,
        churches: action.data,
        church_docs: state.church_docs.concat(action.data),
      }
    case CREATE_CHURCH_FAILED:
      return {
        ...state,
        postLoading: false,
        postSuccess: false,
        error: action.error
      }
    case VALIDATION_ERROR:
      return {
        ...state,
        postLoading: false,
        postSuccess: false,
        loginLoading: false,
        loginSuccess: false,
        loading: false,
        success: false,
        validation_error: action.error
      }
    case CHURCH_LOGIN_START:
      return {
        ...state,
        loginLoading: true,
        loginSuccess: false,
      }
    case CHURCH_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        church: action.data,
      }
    case CHURCH_LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        error: action.error
      }
    case CHURCH_DETAILS_START:
      return {
        ...state,
        church_details_loading: true,
        chruch_details_success: false,
      }
    case CHURCH_DETAILS_SUCCESS:
      return {
        ...state,
        church_details_loading: false,
        chruch_details_success: true,
        church: action.data,
      }
    case CHURCH_DETAILS_FAILED:
      return {
        ...state,
        church_details_loading: false,
        chruch_details_success: false,
        error: action.error
      }
    case ALL_CHURCH_LIST_START:
      return {
        ...state,
        allListLoading: true,
        allListSuccess: false,
      }
    case ALL_CHURCH_LIST_SUCCESS:
      return {
        ...state,
        allListLoading: false,
        allListSuccess: true,
        churches: action.data,
        church_docs: action.data.docs
      }
    case ALL_CHURCH_LIST_FAILED:
      return {
        ...state,
        allListLoading: false,
        allListSuccess: false,
        error: action.error
      }
    case SEARCH_START:
      return {
        ...state,
        search_loading: true,
        search_success: false
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        search_loading: false,
        search_success: true,
        church_docs: action.data,
        churches: action.data,
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
        church_docs: action.data,
      }
    case FILTER_FAILED:
      return {
        ...state,
        filter_loading: false,
        filter_success: false,
        error: action.error,
      }
    case DELETE_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        church_docs: state.church_docs.filter(f => f._id !== action.data._id),
      }
    case DELETE_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error,
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
        church: action.data,
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
        church: action.data,
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