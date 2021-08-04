import { localAuth } from "../../../helper/authenticate";

export const MEMBER_LIST_START = "MEMBER_LIST_START";
export const MEMBER_LIST_SUCCESS = "MEMBER_LIST_SUCCESS";
export const MEMBER_LIST_FAILED = "MEMBER_LIST_FAILED";
export const POST_MEMBER_START = "POST_MEMBER_START";
export const POST_MEMBER_SUCCESS = "POST_MEMBER_SUCCESS";
export const POST_MEMBER_FAILED = "POST_MEMBER_FAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

const BASE_URL = process.env.REACT_APP_URL;

export const memberListStart = () => {
  return {
    type: MEMBER_LIST_START
  }
}

export const memberListSuccess = (data) => {
  return {
    type: MEMBER_LIST_SUCCESS,
    data
  }
}

export const memberListFailed = (error) => {
  return {
    type: MEMBER_LIST_FAILED,
    error
  }
}

export const memberList = () => {
  return dispatch => {
    dispatch(memberListStart());
    fetch(`${BASE_URL}/member/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(memberListFailed(resp.message));
        return dispatch(memberListSuccess(resp.results));
      })
      .catch(err => dispatch(memberListFailed(err.message)));
  }
}

export const postMemberStart = () => {
  return {
    type: POST_MEMBER_START
  }
}

export const postMemberSuccess = (data) => {
  return {
    type: POST_MEMBER_SUCCESS,
    data
  }
}

export const postMemberFailed = (error) => {
  return {
    type: POST_MEMBER_FAILED,
    error
  }
}

export const postMember = (data) => {
  return dispatch => {
    dispatch(postMemberStart());
    fetch(`${BASE_URL}/member/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(postMemberFailed(resp.message));
        dispatch(postMemberSuccess(resp.results));
      })
      .catch(err => dispatch(postMemberFailed(err.message)));
  }
}