import {
  ROLE_LIST_START,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_FAILED,
  CREATE_START,
  CREATE_SUCCESS,
  CREATE_FAILED,
  DELETE_ROLE_START,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  UPDATE_ROLE_START,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  VALIDATION_ERROR,
} from "../../actions/actions_role";

const initialState = {
  roles: [],
  role: {},
  listLoading: false,
  listSuccess: false,
  createLoading: false,
  createSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  validation_error: [],
  error: ""
}

export const role = (state=initialState, action) => {
  switch(action.type) {
    case ROLE_LIST_START:
      return {
        ...state,
        listLoading: true,
        listSuccess: false,
      }
    case ROLE_LIST_SUCCESS:
      return {
        ...state,
        listLoading: false,
        listSuccess: true,
        roles: action.data,
      }
    case ROLE_LIST_FAILED:
      return {
        ...state,
        listLoading: false,
        listSuccess: false,
        error: action.error
      }
    case CREATE_START:
      return {
        ...state,
        createLoading: true,
        createSucceess: false
      }
    case CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSucceess: true,
        roles: state.roles.concat(action.data)
      }
    case CREATE_FAILED:
      return {
        ...state,
        createLoading: false,
        createSucceess: false,
        error: action.error
      }
    case DELETE_ROLE_START:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: false
      }
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        roles: state.roles.filter(r => r._id !== action.data._id)
      }
    case DELETE_ROLE_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    case UPDATE_ROLE_START:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false
      }
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        role: action.data
      }
    case UPDATE_ROLE_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case VALIDATION_ERROR:
      return {
        ...state,
        createLoading: false,
        createSucceess: false,
        validation_error: action.error
      }
    default:
      return state;
  }
}