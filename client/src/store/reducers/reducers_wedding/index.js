import {
  CREATE_WEDDING_START,
  CREATE_WEDDING_SUCCESS,
  CREATE_WEDDING_FAILED,
  WEDDING_LIST_START,
  WEDDING_LIST_SUCCESS,
  WEDDING_LIST_FAILED,
} from "../../actions/actions_wedding";

const initialState = {
  weddings: [],
  wedding: {},
  create_loading: false,
  create_success: false,
  list_loading: false,
  list_success: false,
  error: ""
}

export const wedding = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_WEDDING_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case CREATE_WEDDING_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        weddings: state.weddings.concat(action.data),
      }
    case CREATE_WEDDING_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case WEDDING_LIST_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case WEDDING_LIST_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        weddings: action.data,
      }
    case WEDDING_LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_success: false,
        error: action.error
      }
    default:
      return state;
  }
}