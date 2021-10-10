import {
  CREATE_INCOME_START,
  CREATE_INCOME_SUCCESS,
  CREATE_INCOME_FAILED,
  FETCH_LIST_INCOME_START,
  FETCH_LIST_INCOME_SUCCESS,
  FETCH_LIST_INCOME_FAILED,
  DELETE_INCOME_START,
  DELETE_INCOME_SUCCESS,
  DELETE_INCOME_FAILED,
  CATEGORY_LIST_START,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILED,
} from "../../actions/actions_finance";

const initialState = {
  income_list: [],
  income: {},
  docs: [],
  category_list: [],
  create_loading: false,
  create_success: false,
  delete_loading: false,
  delete_success: false,
  list_loading: false,
  list_success: false,
  category_list_loading: false,
  category_list_success: false,
  error: ""
}

export const finance = (state=initialState, action) => {
  console.log(action.data && action.data.docs, " in reducers")
  switch(action.type) {
    case CREATE_INCOME_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case CREATE_INCOME_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        income_list: action.data,
        docs: state.docs.concat(action.data),
      }
    case CREATE_INCOME_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case FETCH_LIST_INCOME_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case FETCH_LIST_INCOME_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        income_list: action.data,
        docs: action.data.docs,
        error: action.error
      }
    case FETCH_LIST_INCOME_FAILED:
      return {
        ...state,
        list_loading: false,
        list_success: false,
        error: action.error,
      }
    case DELETE_INCOME_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case DELETE_INCOME_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        docs: state.docs.filter(f => f._id !== action.data._id),
      }
    case DELETE_INCOME_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error
      }
    case  CATEGORY_LIST_START:
      return {
        ...state,
        category_list_loading: true,
        category_list_success: false,
      }
    case  CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        category_list_loading: false,
        category_list_success: true,
        category_list: action.data,
      }
    case  CATEGORY_LIST_FAILED:
      return {
        ...state,
        category_list_loading: false,
        category_list_success: false,
        error: action.error
      }
    default: 
      return state;
  }
}