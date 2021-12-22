import Auth from "../../../helper/Auth";
import { localAuth } from "../../../helper/authenticate";

export const ADD_COORDINATOR_START = "ADD_COORDINATOR_START";
export const ADD_COORDINATOR_SUCCESS = "ADD_COORDINATOR_SUCCESS";
export const ADD_COORDINATOR_FAILED = "ADD_COORDINATOR_FAILED";
export const COORDINATOR_LIST_START = "COORDINATOR_LIST_START";
export const COORDINATOR_LIST_SUCCESS = "COORDINATOR_LIST_SUCCESS";
export const COORDINATOR_LIST_FAILED = "COORDINATOR_LIST_FAILED";
export const ASSIGN_CHURCH_START = "ASSIGN_CHURCH_START";
export const ASSIGN_CHURCH_SUCCESS = "ASSIGN_CHURCH_SUCCESS";
export const ASSIGN_CHURCH_FAILED = "ASSIGN_CHURCH_FAILED";
export const DELETE_COORDINATOR_START = "DELETE_COORDINATOR_START";
export const DELETE_COORDINATOR_SUCCESS = "DELETE_COORDINATOR_SUCCESS";
export const DELETE_COORDINATOR_FAILED = "DELETE_COORDINATOR_FAILED";
export const COORDINATING_CHURCH_LIST_START = "COORDINATING_CHURCH_LIST_START";
export const COORDINATING_CHURCH_LIST_SUCCESS = "COORDINATING_CHURCH_LIST_SUCCESS";
export const COORDINATING_CHURCH_LIST_FAILED = "COORDINATING_CHURCH_LIST_FAILED";
export const UPDATE_COORDINATOR_START = "UPDATE_COORDINATOR_START";
export const UPDATE_COORDINATOR_SUCCESS = "UPDATE_COORDINATOR_SUCCESS";
export const UPDATE_COORDINATOR_FAILED = "UPDATE_COORDINATOR_FAILED";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";
export const FILTER_START = "FILTER_START";
export const FILTER_SUCCESS = "FILTER_SUCCESS";
export const FILTER_FAILED = "FILTER_FAILED";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const VALIDATION_ERROR = "VALIDATION_ERROR";

export const FORGOT_PASSWORD_START = "FORGOT_PASSWORD_START";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
 
const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().user?._id;


export const validationError = (error) => {
  return {
    type: VALIDATION_ERROR,
    error
  }
}

export const loginStart = () => {
  return {
    type: LOGIN_START
  }
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export const coordinatorLogin = (data) => {
  return dispatch => {
    dispatch(loginStart());
    fetch(`${BASE_URL}/zonal_pastor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error && resp.message === "Validation errors") return dispatch(validationError(resp.errors));
        if (resp.error && resp.message !== "Validation errors") return dispatch(loginFailed(resp.message))
        Auth.authenticateUser(JSON.stringify(resp.results));
        dispatch(loginSuccess(resp.results));
      })
      .catch(err => dispatch(loginFailed(err.message)));
  }
}


export const add_coordinator_start = () => {
  return {
    type: ADD_COORDINATOR_START
  }
}

export const add_coordinator_success = (data) => {
  return {
    type: ADD_COORDINATOR_SUCCESS,
    data
  }
}

export const add_coordinator_failed = (error) => {
  return {
    type: ADD_COORDINATOR_FAILED,
    error
  }
}

export const add_coordinator = (data) => {
  return dispatch => {
    dispatch(add_coordinator_start());
    fetch(`${BASE_URL}/zonal_pastor/new`, {
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
        if (resp.error && resp.message === "Validation errors") return dispatch(validationError(resp.errors));
        if (resp.error && resp.message !== "Validation errors") return dispatch(add_coordinator_failed(resp.message))
        return dispatch(add_coordinator_success(resp.results));
      })
      .catch(err => dispatch(add_coordinator_failed(err.message)));
  }
}

export const coordinator_list_start = () => {
  return {
    type: COORDINATOR_LIST_START
  }
}

export const coordinator_list_success = (data) => {
  return {
    type: COORDINATOR_LIST_SUCCESS,
    data
  }
}

export const coordinator_list_failed = (error) => {
  return {
    type: COORDINATOR_LIST_FAILED,
    error
  }
}

export const coordinator_list = (offset, limit) => {
  return dispatch => {
    dispatch(coordinator_list_start());
    fetch(`${BASE_URL}/zonal_pastor/all?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(coordinator_list_failed(resp.message));
        return dispatch(coordinator_list_success(resp.results));
      })
      .catch(err => dispatch(coordinator_list_failed(err.message)));
  }
}

export const coordinator_churches_start = () => {
  return {
    type: COORDINATING_CHURCH_LIST_START
  }
}

export const coordinator_churches_success = (data) => {
  return {
    type: COORDINATING_CHURCH_LIST_SUCCESS,
    data
  }
}

export const coordinator_churches_failed = (error) => {
  return {
    type: COORDINATING_CHURCH_LIST_FAILED,
    error
  }
}

export const coordinating_church_list = (offset, limit) => {
  return dispatch => {
    dispatch(coordinator_churches_start());
    fetch(`${BASE_URL}/zonal_pastor/church_list?coordinatorId=${id}&offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(coordinator_churches_failed(resp.message));
        return dispatch(coordinator_churches_success(resp.results));
      })
      .catch(err => dispatch(coordinator_churches_failed(err.message)));
  }
}

export const assign_church_start = () => {
  return {
    type: ASSIGN_CHURCH_START
  }
}

export const assign_church_success = (data) => {
  return {
    type: ASSIGN_CHURCH_SUCCESS,
    data
  }
}

export const assign_church_failed = (error) => {
  return {
    type: ASSIGN_CHURCH_FAILED,
    error
  }
}

export const assign_church = (data) => {
  return dispatch => {
    dispatch(assign_church_start());
    fetch(`${BASE_URL}/zonal_pastor/assign_church`, {
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
        if (resp.error) return dispatch(assign_church_failed(resp.message));
        return dispatch(assign_church_success(resp.results));
      })
      .catch(err => dispatch(assign_church_failed(err.message)));
  }
}

export const update_coordinator_start = () => {
  return {
    type: UPDATE_COORDINATOR_START
  }
}

export const update_coordinator_success = (data) => {
  return {
    type: UPDATE_COORDINATOR_SUCCESS,
    data
  }
}

export const update_coordinator_failed = (error) => {
  return {
    type: UPDATE_COORDINATOR_FAILED,
    error
  }
}

export const update_coordinator = (data) => {
  return dispatch => {
    dispatch(update_coordinator_start());
    fetch(`${BASE_URL}/zonal_pastor/update`, {
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
        if (resp.error) return dispatch(update_coordinator_failed(resp.message));
        return dispatch(update_coordinator_success(resp.results));
      })
      .catch(err => dispatch(update_coordinator_failed(err.message)));
  }
}

export const delete_coordinator_start = () => {
  return {
    type: DELETE_COORDINATOR_START
  }
}

export const delete_coordinator_success = (data) => {
  return {
    type: DELETE_COORDINATOR_SUCCESS,
    data
  }
}

export const delete_coordinator_failed = (error) => {
  return {
    type: DELETE_COORDINATOR_FAILED,
    error
  }
}

export const delete_coordinator = (id) => {
  return dispatch => {
    dispatch(delete_coordinator_start());
    fetch(`${BASE_URL}/zonal_pastor/delete?zonal_pastor_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(delete_coordinator_failed(resp.message));
        return dispatch(delete_coordinator_success(resp.results));
      })
      .catch(err => dispatch(delete_coordinator_failed(err.message)));
  }
}

export const search_start = () => {
  return {
    type: SEARCH_START
  }
}

export const search_success = (data) => {
  return {
    type: SEARCH_SUCCESS,
    data
  }
}

export const search_failed = (error) => {
  return {
    type: SEARCH_FAILED,
    error
  }
}

export const search_coordinators = (search_term) => {
  return dispatch => {
    dispatch(search_start());
    fetch(`${BASE_URL}/zonal_pastor/search?searchTerm=${search_term}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(search_failed(resp.message));
        return dispatch(search_success(resp.results));
      })
      .catch(err => dispatch(search_failed(err.message)));
  }
}

export const filter_start = () => {
  return {
    type: FILTER_START
  }
}

export const filter_success = (data) => {
  return {
    type: FILTER_SUCCESS,
    data
  }
}

export const filter_failed = (error) => {
  return {
    type: FILTER_FAILED,
    error
  }
}

export const filter_coordinators = (data) => {
  return dispatch => {
    dispatch(filter_start());
    fetch(`${BASE_URL}/zonal_pastor/filter?time_range=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(filter_failed(resp.message));
        return dispatch(filter_success(resp.results));
      })
      .catch(err => dispatch(filter_failed(err.message)));
  }
}

export const forgotPasswordStart = () => {
  return {
    type: FORGOT_PASSWORD_START
  }
}

export const forgotPasswordSuccess = (data) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    data
  }
}

export const forgotPasswordFailed = (error) => {
  return {
    type: FORGOT_PASSWORD_FAILED,
    error
  }
}

export const zonalForgotPassword = (data) => {
  return dispatch => {
    dispatch(forgotPasswordStart());
    fetch(`${BASE_URL}/zonal_pastor/forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error && resp.message !== "Validation errors") return dispatch(forgotPasswordFailed(resp.message));
        if (resp.error && resp.message === "Validation errors") return dispatch(validationError(resp.errors));
        dispatch(forgotPasswordSuccess(resp.results));
      })
      .catch(err => dispatch(forgotPasswordFailed(err.message)));
  }
}

export const resetPasswordStart = () => {
  return {
    type: RESET_PASSWORD_START
  }
}

export const resetPasswordSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data
  }
}

export const resetPasswordFailed = (error) => {
  return {
    type: RESET_PASSWORD_FAILED,
    error
  }
}

export const zonalResetPassword = (data) => {
  return dispatch => {
    dispatch(resetPasswordStart());
    fetch(`${BASE_URL}/zonal_pastor/reset_password/${data?.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error && resp.message !== "Validation errors") return dispatch(resetPasswordStart(resp.message));
        if (resp.error && resp.message === "Validation errors") return dispatch(validationError(resp.errors));
        dispatch(resetPasswordSuccess(resp.results));
      })
      .catch(err => dispatch(resetPasswordFailed(err.message)));
  }
}