import { localAuth } from "../../../helper/authenticate";

export const CREATE_WEDDING_START = "CREATE_WEDDING_START";
export const CREATE_WEDDING_SUCCESS = "CREATE_WEDDING_SUCCESS";
export const CREATE_WEDDING_FAILED = "CREATE_WEDDING_FAILED";
export const WEDDING_LIST_START = "WEDDING_LIST_START";
export const WEDDING_LIST_SUCCESS = "WEDDING_LIST_SUCCESS";
export const WEDDING_LIST_FAILED = "WEDDING_LIST_FAILED";
export const DELETE_WEDDING_START = "DELETE_WEDDING_START";
export const DELETE_WEDDING_SUCCESS = "DELETE_WEDDING_SUCCESS";
export const DELETE_WEDDING_FAILED = "DELETE_WEDDING_FAILED";
export const UPDATE_WEDDING_START = "UPDATE_WEDDING_START";
export const UPDATE_WEDDING_SUCCESS = "UPDATE_WEDDING_SUCCESS";
export const UPDATE_WEDDING_FAILED = "UPDATE_WEDDING_FAILED";

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
        "Authorization": `Bearer ${token}`
      },
      body: data
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

export const updateWeddingStart = () => {
  return {
    type: UPDATE_WEDDING_START
  }
}

export const updateWeddingSuccess = (data) => {
  return {
    type: UPDATE_WEDDING_SUCCESS,
    data
  }
}

export const updateWeddingFailed = (error) => {
  return {
    type: UPDATE_WEDDING_FAILED,
    error
  }
}

export const updateWedding = (data) => {
  return dispatch => {
    dispatch(updateWeddingStart());
    fetch(`${BASE_URL}/wedding/update?church=${id}`, {
      method: "PUT", 
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: data
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateWeddingFailed(resp.message));
        dispatch(updateWeddingSuccess(resp.results));
      })
      .catch(err => dispatch(updateWeddingFailed(err.message)));
  }
}

export const deleteWeddingStart = () => {
  return {
    type: DELETE_WEDDING_START
  }
}

export const deleteWeddingSuccess = (data) => {
  return {
    type: DELETE_WEDDING_SUCCESS,
    data
  }
}

export const deleteWeddingFailed = (error) => {
  return {
    type: DELETE_WEDDING_FAILED,
    error
  }
}

export const deleteWedding = (data) => {
  return dispatch => {
    dispatch(deleteWeddingStart());
    fetch(`${BASE_URL}/wedding/delete?church=${id}&id=${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteWeddingFailed(resp.message));
        dispatch(deleteWeddingSuccess(resp.results));
      })
      .catch(err => dispatch(deleteWeddingFailed(err.message)));
  }
}