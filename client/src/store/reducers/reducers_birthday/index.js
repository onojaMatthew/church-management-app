import {
  CREATE_BIRTHDAY_START,
  CREATE_BIRTHDAY_SUCCESS,
  CREATE_BIRTHDAY_FAILED,
  BIRTHDAY_LIST_START,
  BIRTHDAY_LIST_SUCCESS,
  BIRTHDAY_LIST_FAILED,
  GET_BIRTHDAY_START,
  GET_BIRTHDAY_SUCCESS,
  GET_BIRTHDAY_FAILED,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
} from "../../actions/actions_birthday";


const initialState = {
  birthdays: [],
  birthday: {},
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

export const birthday = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_BIRTHDAY_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case CREATE_BIRTHDAY_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        birthdays: action.data,
      }
    case CREATE_BIRTHDAY_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case BIRTHDAY_LIST_START:
      return {
        ...state,
        get_loading: true,
        get_success: false,
        
      }
    case BIRTHDAY_LIST_SUCCESS:
      return {
        ...state,
        get_loading: false,
        get_success: true,
        birthdays: action.data,
      }
    case BIRTHDAY_LIST_FAILED:
      return {
        ...state,
        get_loading: false,
        get_success: false,
        error: action.error
      }
    case GET_BIRTHDAY_START:
      return {
        ...state,
        get_loading: true,
        get_success: false,
      }
    case GET_BIRTHDAY_SUCCESS:
      return {
        ...state,
        get_loading: false,
        get_success: true,
        birthday: action.data,
      }
    case GET_BIRTHDAY_FAILED:
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
        birthday: action.data,
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
        birthday: action.data,
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
        birthdays: action.data,
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