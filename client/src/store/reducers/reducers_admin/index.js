import {
  ADMIN_DETAILS_START,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAILED,
  PROFILE_UPDATE_START,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED,
} from "../../actions/actions_admin";

const initialState  = {
  admin: {},
  loading: false,
  success: false,
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
    default:
      return state;
  }
}