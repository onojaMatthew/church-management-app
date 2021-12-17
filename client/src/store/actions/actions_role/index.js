import { localAuth } from "../../../helper/authenticate";

export const ROLE_LIST_START = "ROLE_LIST_START";
export const ROLE_LIST_SUCCESS = "ROLE_LIST_SUCCESS";
export const ROLE_LIST_FAILED = "ROLE_LIST_FAILED";
export const CREATE_START = "CREATE_START";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAILED = "CREATE_FAILED";
export const DELETE_ROLE_START = "DELETE_ROLE_START";
export const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS";
export const DELETE_ROLE_FAILED = "DELETE_ROLE_FAILED";
export const UPDATE_ROLE_START = "UPDATE_ROLE_START";
export const UPDATE_ROLE_SUCCESS = "UPDATE_ROLE_SUCCESS";
export const UPDATE_ROLE_FAILED = "UPDATE_ROLE_FAILED";
export const VALIDATION_ERROR = "VALIDATION_ERROR";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;

export const validationError = (error) => {
  return {
    type: VALIDATION_ERROR,
    error
  }
}

export const roleListStart = () => {
  return {
    type: ROLE_LIST_START
  }
}

export const roleListSuccess = (data) => {
  return {
    type: ROLE_LIST_SUCCESS,
    data
  }
}

export const roleListFailed = (error) => {
  return {
    type: ROLE_LIST_FAILED,
    error
  }
}

export const roleList = () => {
  return dispatch => {
    dispatch(roleListStart());
    fetch(`${BASE_URL}/role/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(roleListFailed(resp.message));
        return dispatch(roleListSuccess(resp.results));
      })
      .catch(err => dispatch(roleListFailed(err.message)));
  }
}

export const createStart = () => {
  return {
    type: CREATE_START
  }
}

export const createSuccess = (data) => {
  return {
    type: CREATE_SUCCESS,
    data
  }
}

export const createFailed = (error) => {
  return {
    type: CREATE_FAILED,
    error
  }
}

export const createRole = (data) => {
  return dispatch => {
    dispatch(createStart());
    fetch(`${BASE_URL}/role/new`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error && resp.message === "Validation errors") return dispatch(validationError(resp.errors));
        if (resp.error && resp.message !== "Validation errors") return dispatch(createFailed(resp.message));
        dispatch(createSuccess(resp.results));
      })
      .catch(err => dispatch(createFailed(err.message)));
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_ROLE_START
  }
}

export const updateSuccess = (data) => {
  return {
    type: UPDATE_ROLE_SUCCESS,
    data
  }
}

export const updateFailed = (error) => {
  return {
    type: UPDATE_ROLE_FAILED,
    error
  }
}

export const updateRole = (data) => {
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/role/update`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateFailed(resp.message));
        dispatch(updateSuccess(resp.results));
      })
      .catch(err => dispatch(updateFailed(err.message)));
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_ROLE_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_ROLE_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_ROLE_FAILED,
    error
  }
}

export const deleteRole = (id) => {
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/role/delete?role=${id}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.message));
        dispatch(deleteSuccess(resp.results));
      })
      .catch(err => dispatch(deleteFailed(err.message)));
  }
}