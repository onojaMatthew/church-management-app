import {
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
} from "../../actions/actions_uploader";

const initialState = {
  files: {},
  upload_loading: false,
  upload_success: false,
  error: ""
}

export const upload = (state=initialState, action) => {
  switch(action.type) {
    case UPLOAD_START:
      return {
        ...state,
        upload_loading: true,
        upload_success: false,
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        upload_loading: false,
        upload_success: true,
        files: action.data,
      }
    case UPLOAD_FAILED:
      return {
        ...state,
        upload_loading: false,
        upload_success: false,
        error: action.error
      }
    default:
      return state;
  }
}