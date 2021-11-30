import {
  GET_DATA_START,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  ADMIN_DATA_START,
  ADMIN_DATA_SUCCESS,
  ADMIN_DATA_FAILED,
} from "../../actions/actions_dashboard_data";

const initialState = {
  data: {},
  loading: false,
  success: false,
  error: ""
}

export const dashboard_data = (state=initialState, action) => {
  switch (action.type) {
    case GET_DATA_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.data,
      }
    case GET_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case ADMIN_DATA_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case ADMIN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.data,
      }
    case ADMIN_DATA_FAILED:
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