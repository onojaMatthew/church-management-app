import {
  CREATE_SERVICE_START,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAILED,
  SERVICE_LIST_START,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAILED,
  GET_SERVICE_START,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAILED,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
} from "../../actions/actions_service";

const initialState = {
  services: [],
  docs: [],
  service: {},
  create_loading: false,
  create_success: false,
  get_loading: false,
  get_success: false,
  update_loading: false,
  update_success: false,
  delete_loading: false,
  delete_success: false,
  search_loading: false,
  search_success: false,
  error: ""
}

export const service = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_SERVICE_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        docs: state.docs.concat(action.data),
        services: action.data
      }
    case CREATE_SERVICE_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case SERVICE_LIST_START:
      return {
        ...state,
        get_loading: true,
        get_success: false,
        
      }
    case SERVICE_LIST_SUCCESS:
      return {
        ...state,
        get_loading: false,
        get_success: true,
        docs: action.data?.docs,
        services: action.data,
      }
    case SERVICE_LIST_FAILED:
      return {
        ...state,
        get_loading: false,
        get_success: false,
        error: action.error
      }
    case GET_SERVICE_START:
      return {
        ...state,
        get_loading: true,
        get_success: false,
      }
    case GET_SERVICE_SUCCESS:
      return {
        ...state,
        get_loading: false,
        get_success: true,
        service: action.data,
      }
    case GET_SERVICE_FAILED:
      return {
        ...state,
        get_loading: false,
        get_success: false,
        error: action.error
      }
    case UPDATE_START:
      return {
        ...state,
        update_loading: true,
        update_success: false,
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        update_loading: false,
        update_success: true,
        service: action.data,
      }
    case UPDATE_FAILED:
      return {
        ...state,
        update_loading: false,
        update_success: false,
        error: action.error
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
        docs: state.docs.filter(f => f._id !== action.data._id)
      }
    case DELETE_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error
      }
    case  SEARCH_START:
      return {
        ...state,
        search_loading: true,
        search_success: false,
      }
    case  SEARCH_SUCCESS:
      return {
        ...state,
        search_loading: false,
        search_success: true,
        services: action.data,
      }
    case  SEARCH_FAILED:
      return {
        ...state,
        search_loading: false,
        search_success: false,
        error: action.error
      }
    default:
      return state;
  }
}