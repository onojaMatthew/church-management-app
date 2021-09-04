import { localAuth } from "../../../helper/authenticate";

export const CREATE_WEDDING_START = "CREATE_WEDDING_START";
export const CREATE_WEDDING_SUCCESS = "CREATE_WEDDING_SUCCESS";
export const CREATE_WEDDING_FAILED = "CREATE_WEDDING_FAILED";

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
        ACCEPT: "application/json"
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