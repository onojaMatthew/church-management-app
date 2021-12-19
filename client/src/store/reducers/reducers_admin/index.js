import {
  ADMIN_DETAILS_START,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAILED,
  PROFILE_UPDATE_START,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED,
  CHURCH_LOGO_START,
  CHURCH_LOGO_SUCCESS,
  CHURCH_LOGO_FAILED,
} from "../../actions/actions_admin";

const initialState  = {
  admin: {},
  logo: {},
  loading: false,
  success: false,
  logo_loading: false,
  logo_success: false,
  error: ""
}

export const adminReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADMIN_DETAILS_START:
      return {
        ...state,
        loading: true,
        success: false
      }
    case ADMIN_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        admin: action.data,
      }
    case ADMIN_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case PROFILE_UPDATE_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        admin: action.data,
      }
    case PROFILE_UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case CHURCH_LOGO_START:
      return {
        ...state,
        logo_loading: true,
        logo_success: false,
      }
    case CHURCH_LOGO_SUCCESS:
      return {
        ...state,
        logo_loading: false,
        logo_success: true,
        logo: action.data,
      }
    case CHURCH_LOGO_FAILED:
      return {
        ...state,
        logo_loading: false,
        logo_success: false,
        error: action.error
      }
    default:
      return state;
  }
}