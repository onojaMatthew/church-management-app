import Auth from "../../../helper/Auth";
import { localAuth } from "../../../helper/authenticate";

export const CREATE_BIRTHDAY_START = "CREATE_BIRTHDAY_START";
export const CREATE_BIRTHDAY_SUCCESS = "CREATE_BIRTHDAY_SUCCESS";
export const CREATE_BIRTHDAY_FAILED = "CREATE_BIRTHDAY_FAILED";
export const BIRTHDAY_LIST_START = "BIRTHDAY_LIST_START";
export const BIRTHDAY_LIST_SUCCESS = "BIRTHDAY_LIST_SUCCESS";
export const BIRTHDAY_LIST_FAILED = "BIRTHDAY_LIST_FAILED";
export const GET_BIRTHDAY_START = "GET_BIRTHDAY_START";
export const GET_BIRTHDAY_SUCCESS = "GET_BIRTHDAY_SUCCESS";
export const GET_BIRTHDAY_FAILED = "GET_BIRTHDAY_FAILED";
export const UPDATE_START = "UPDATE_START";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";
export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILED = "DELETE_FAILED";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const church = localAuth().church && localAuth().church._id;

export const createStart = () => {
  return {
    type: CREATE_BIRTHDAY_START
  }
}

export const createSuccess = (data) => {
  return {
    type: CREATE_BIRTHDAY_SUCCESS,
    data
  }
}

export const createFailed = (error) => {
  return {
    type: CREATE_BIRTHDAY_FAILED,
    error
  }
}

export const createBirthday = (data) => {
  return dispatch => {
    dispatch(createStart());
    fetch(`${BASE_URL}/birthday/new`, {
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
        if (resp.error) return dispatch(createFailed(resp.message));
        return dispatch(createSuccess(resp.results));
      })
      .catch(err => dispatch(createFailed(err.message)));
  }
}

export const listStart = () => {
  return {
    type: BIRTHDAY_LIST_START
  }
}

export const listSuccess = (data) => {
  return {
    type: BIRTHDAY_LIST_SUCCESS,
    data
  }
}

export const listFailed = (error) => {
  return {
    type: BIRTHDAY_LIST_FAILED,
    error
  }
}

export const birthdayList = (offset, limit) => {
  return dispatch => {
    dispatch(listStart());
    fetch(`${BASE_URL}/birthday/all/${church}?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(listFailed(resp.message));
        return dispatch(listSuccess(resp.results));
      })
      .catch(err => {
        dispatch(listFailed(err.message));
      });
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_START
  }
}

export const updateSuccess = (data) => {
  return {
    type: UPDATE_SUCCESS,
    data
  }
}

export const updateFailed = (error) => {
  return {
    type: UPDATE_FAILED,
    error
  }
}

export const updateBirthday = (data) => {
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/birthday/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateFailed(resp.message));
        dispatch(updateSuccess(resp.results));
      })
      .catch(err => {
        dispatch(updateFailed(err.message));
      });
  }
}

export const birthdayStart = () => {
  return {
    type: GET_BIRTHDAY_START
  }
}

export const birthdaySuccess = (data) => {
  return {
    type: GET_BIRTHDAY_SUCCESS,
    data
  }
}

export const birthdayFailed = (error) => {
  return {
    type: GET_BIRTHDAY_FAILED,
    error
  }
}

export const getBirthday = () => {
  return dispatch => {
    dispatch(birthdayStart());
    fetch(`${BASE_URL}/birthday/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(birthdayFailed(resp.message));
        dispatch(birthdaySuccess(resp.results));
      })
      .catch(err => {
        dispatch(birthdayFailed(err.message))
      })
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_FAILED,
    error
  }
}

export const deleteBirthday = (data) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/birthday/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.message));
        dispatch(deleteSuccess(resp.results));
      })
      .catch(err => {
        dispatch(deleteFailed(err.message));
      });
 }}

