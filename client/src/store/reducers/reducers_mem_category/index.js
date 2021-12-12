import {
  CATEGORY_START,
  CATEGORY_SUCCESS,
  CATEGORY_FAILED,
  CATEGORY_LIST_START,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILED,
  CREATE_CATEGORY_START,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_START,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
} from "../../actions/actions_mem_category";

const initialState = {
  categories: [],
  categoryInfo: {},
  categoryLoading: false,
  categorySuccess: false,
  categoryListLoading: false,
  categoryListSuccess: false,
  create_loading: false,
  create_success: false,
  delete_loading: false,
  delete_success: false,
  update_loading: false,
  update_success: false,
  error: ""
}

export const category = (state=initialState, action) => {
  switch(action.type) {
    case CATEGORY_START:
      return {
        ...state,
        categoryLoading: true,
        categorySuccess: false,
      }
    case CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoading: false,
        categorySuccess: true,
        categoryInfo: action.data,
      }
    case CATEGORY_FAILED:
      return {
        ...state,
        categoryLoading: false,
        categorySuccess: false,
        error: action.error
      }
    case CATEGORY_LIST_START:
      return {
        ...state,
        categoryListLoading: true,
        categoryListSuccess: false,
      }
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryListLoading: false,
        categoryListSuccess: true,
        categories: action.data,
      }
    case CATEGORY_LIST_FAILED:
      return {
        ...state,
        categoryListLoading: false,
        categoryListSuccess: false,
        error: action.error
      }
    case CREATE_CATEGORY_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        categories: state.categories.concat(action.data),
      }
    case CREATE_CATEGORY_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case UPDATE_CATEGORY_START:
      return {
        ...state,
        update_loading: true,
        update_success: false,
      }
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        update_loading: false,
        update_success: true,
        category: action.data,
      }
    case UPDATE_CATEGORY_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case DELETE_CATEGORY_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
        categories: state.categories.concat(action.data),
        error: action.error
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        categories: state.categories.filter(d => d._id !== action.data._id),
      }
    case DELETE_CATEGORY_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error
      }
    default:
      return state;
  }
}