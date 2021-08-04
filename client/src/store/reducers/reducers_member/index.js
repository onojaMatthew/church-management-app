import {
  MEMBER_LIST_START,
  MEMBER_LIST_SUCCESS,
  MEMBER_LIST_FAILED,
  POST_MEMBER_START,
  POST_MEMBER_SUCCESS,
  POST_MEMBER_FAILED,
} from "../../actions/actions_member";

const initialState = {
  members: [],
  member: {},
  listLoading: false,
  listSuccess: false,
  postLoading: false,
  postSuccess: false,
  error: ""
}

export const member = (state=initialState, action) => {
  switch(action.type) {
    case MEMBER_LIST_START:
      return {
        ...state,
        listLoading: true,
        listSuccess: false,
      }
    case MEMBER_LIST_SUCCESS:
      return {
        ...state,
        listLoading: false,
        listSuccess: true,
        members: action.data,
      }
    case MEMBER_LIST_FAILED:
      return {
        ...state,
        listLoading: false,
        listSuccess: false,
        error: action.error
      }
    case POST_MEMBER_START:
      return {
        ...state,
        postLoading: true,
        postSuccess: false,
      }
    case POST_MEMBER_SUCCESS:
      return {
        ...state,
        postLoading: false,
        postSuccess: true,
        members: state.members.concat(action.data),
      }
    case POST_MEMBER_FAILED:
      return {
        ...state,
        postLoading: false,
        postSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}