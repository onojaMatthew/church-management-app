import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  VALIDATION_ERROR,
} from "../../actions/actions_login";

const initialState = {
  account: {},
  loginLoading: false,
  loginSuccess: false,
  logoutLoading: false,
  logoutSuccess: false,
  loading: false,
  success: false,
  validation_error: [],
  error: ""
}

export const account = (state=initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        loginLoading: true,
        loginSuccess: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        account: action.data,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        error: action.error
      }
    case LOGOUT_START:
      return {
        ...state,
        logoutLoading: true,
        logoutSuccess: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: true,
        account: action.data,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: false,
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
        account: action.data,
      }
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
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
        account: action.data,
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      }
    case VALIDATION_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        loading: false,
        success: false,
        validation_error: action.error
      }
    default:
      return state;
  }
}