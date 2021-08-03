import { localAuth } from "../../../helper/authenticate";

export const MEMBER_LIST_START = "MEMBER_LIST_START";
export const MEMBER_LIST_SUCCESS = "MEMBER_LIST_SUCCESS";
export const MEMBER_LIST_FAILED = "MEMBER_LIST_FAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

console.log(id, " the church id")
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