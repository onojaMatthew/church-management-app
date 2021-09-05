import { localAuth } from "../../../helper/authenticate";

export const CREATE_WEDDING_START = "CREATE_WEDDING_START";
export const CREATE_WEDDING_SUCCESS = "CREATE_WEDDING_SUCCESS";
export const CREATE_WEDDING_FAILED = "CREATE_WEDDING_FAILED";
export const WEDDING_LIST_START = "WEDDING_LIST_START";
export const WEDDING_LIST_SUCCESS = "WEDDING_LIST_SUCCESS";
export const WEDDING_LIST_FAILED = "WEDDING_LIST_FAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

const BASE_URL = process.env.REACT_APP_URL;

export const createWeddingStart = () => {
  return {
    type: CREATE_WEDDING_START
  }
}

export const createWeddingSuccess = (data) => {
  return {
    type: CREATE_WEDDING_SUCCESS,
    data
  }
}

export const createWeddingFailed = (error) => {
  return {
    type: CREATE_WEDDING_FAILED,
    error
  }
}

export const createWedding = (data) => {
  return dispatch => {
    dispatch(createWeddingStart());
    fetch(`${BASE_URL}/wedding/new?church=${id}`, {
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
        if (resp.error) return dispatch(createWeddingFailed(resp.message));
        dispatch(createWeddingSuccess(resp.results));
      })
      .catch(err => dispatch(createWeddingFailed(err.message)));
  }
}

export const weddingListStart = () => {
  return {
    type: WEDDING_LIST_START
  }
}

export const weddingListSuccess = (data) => {
  return {
    type: WEDDING_LIST_SUCCESS,
    data
  }
}

export const weddingListFailed = (error) => {
  return {
    type: WEDDING_LIST_FAILED,
    error
  }
}

export const weddingList = () => {
  return dispatch => {
    dispatch(weddingListStart());
    fetch(`${BASE_URL}/wedding/all?church=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(weddingListFailed(resp.message));
        dispatch(weddingListSuccess(resp.results));
      })
      .catch(err => dispatch(weddingListFailed(err.message)));
  }
}