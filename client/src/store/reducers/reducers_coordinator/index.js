import {
  ADD_COORDINATOR_START,
  ADD_COORDINATOR_SUCCESS,
  ADD_COORDINATOR_FAILED,
  COORDINATOR_LIST_START,
  COORDINATOR_LIST_SUCCESS,
  COORDINATOR_LIST_FAILED,
  ASSIGN_CHURCH_START,
  ASSIGN_CHURCH_SUCCESS,
  ASSIGN_CHURCH_FAILED,
  DELETE_COORDINATOR_START,
  DELETE_COORDINATOR_SUCCESS,
  DELETE_COORDINATOR_FAILED,
  COORDINATING_CHURCH_LIST_START,
  COORDINATING_CHURCH_LIST_SUCCESS,
  COORDINATING_CHURCH_LIST_FAILED,
  UPDATE_COORDINATOR_START,
  UPDATE_COORDINATOR_SUCCESS,
  UPDATE_COORDINATOR_FAILED,
} from "../../actions/actions_coordinator";

const initialState = {
  coordinators: [],
  coordinator_docs: [],
  church_list: [],
  coordinator: {},
  add_loading: false,
  add_success: false,
  list_loading: false,
  list_success: false,
  assign_loading: false,
  assign_success: false,
  delete_loading: false,
  delete_success: false,
  church_list_loading: false,
  church_list_success: false,
  update_loading: false,
  update_suucess: false,
  error: "",
}

export const coordinatorReducer = (state=initialState, action) => {
  switch(action.type) { 
    case ADD_COORDINATOR_START:
      return {
        ...state,
        add_loading: true,
        add_success: false,
      }
    case ADD_COORDINATOR_SUCCESS:
      return {
        ...state,
        add_loading: false,
        add_success: true,
        coordinator_docs: state.coordinator_docs.concat(action.data)
      }
    case ADD_COORDINATOR_FAILED:
      return {
        ...state,
        add_loading: false,
        add_success: false,
        error: action.error
      }
    case COORDINATOR_LIST_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case COORDINATOR_LIST_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        coordinators: action.data,
        coordinator_docs: action.data.docs
      }
    case COORDINATOR_LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_success: false,
        error: action.error
      }
    case ASSIGN_CHURCH_START:
      return {
        ...state,
        assign_loading: true,
        assign_success: false,
      }
    case ASSIGN_CHURCH_SUCCESS:
      return {
        ...state,
        assign_loading: false,
        assign_success: true,
        coordinator: action.data,
      }
    case ASSIGN_CHURCH_FAILED:
      return {
        ...state,
        assign_loading: false,
        assign_success: false,
        error: action.error
      }
    case DELETE_COORDINATOR_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
        coordinators: action.data,
        coordinator_docs: state.coordinator_docs.concat(action.data)
      }
    case DELETE_COORDINATOR_SUCCESS:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
        coordinator_docs: state.coordinator_docs.filter(f => f._id !== action.data._id)
      }
    case DELETE_COORDINATOR_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        error: action.error
      }
    case COORDINATING_CHURCH_LIST_START:
      return {
        ...state,
        church_list_loading: true,
        church_list_success: false,
      }
    case COORDINATING_CHURCH_LIST_SUCCESS:
      return {
        ...state,
        church_list_loading: false,
        church_list_success: true,
        church_list: action.data,
      }
    case COORDINATING_CHURCH_LIST_FAILED:
      return {
        ...state,
        church_list_loading: false,
        church_list_success: false,
      }
    case UPDATE_COORDINATOR_START:
      return {
        ...state,
        update_loading: true,
        update_success: false,
      }
    case UPDATE_COORDINATOR_SUCCESS:
      return {
        ...state,
        update_loading: true,
        update_success: false,
        coordinator: action.data,
      }
    case UPDATE_COORDINATOR_FAILED:
      return {
        ...state,
        update_loading: true,
        update_success: false,
        error: action.error
      }
    default: 
      return state;
  }
}