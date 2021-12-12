import Auth from "../../../helper/Auth";
import { localAuth } from "../../../helper/authenticate";

export const ADD_REGIONAL_PASTOR_START = "ADD_REGIONAL_PASTOR_START";
export const ADD_REGIONAL_PASTOR_SUCCESS = "ADD_REGIONAL_PASTOR_SUCCESS";
export const ADD_REGIONAL_PASTOR_FAILED = "ADD_REGIONAL_PASTOR_FAILED";
export const REGIONAL_PASTOR_LIST_START = "REGIONAL_PASTOR_LIST_START";
export const REGIONAL_PASTOR_LIST_SUCCESS = "REGIONAL_PASTOR_LIST_SUCCESS";
export const REGIONAL_PASTOR_LIST_FAILED = "REGIONAL_PASTOR_LIST_FAILED";
export const ASSIGN_CHURCH_START = "ASSIGN_CHURCH_START";
export const ASSIGN_CHURCH_SUCCESS = "ASSIGN_CHURCH_SUCCESS";
export const ASSIGN_CHURCH_FAILED = "ASSIGN_CHURCH_FAILED";
export const DELETE_REGIONAL_PASTOR_START = "DELETE_REGIONAL_PASTOR_START";
export const DELETE_REGIONAL_PASTOR_SUCCESS = "DELETE_REGIONAL_PASTOR_SUCCESS";
export const DELETE_REGIONAL_PASTOR_FAILED = "DELETE_REGIONAL_PASTOR_FAILED";
export const CHURCH_LIST_START = "CHURCH_LIST_START";
export const CHURCH_LIST_SUCCESS = "CHURCH_LIST_SUCCESS";
export const CHURCH_LIST_FAILED = "CHURCH_LIST_FAILED";
export const UPDATE_REGIONAL_PASTOR_START = "UPDATE_REGIONAL_PASTOR_START";
export const UPDATE_REGIONAL_PASTOR_SUCCESS = "UPDATE_REGIONAL_PASTOR_SUCCESS";
export const UPDATE_REGIONAL_PASTOR_FAILED = "UPDATE_REGIONAL_PASTOR_FAILED";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";
export const FILTER_START = "FILTER_START";
export const FILTER_SUCCESS = "FILTER_SUCCESS";
export const FILTER_FAILED = "FILTER_FAILED";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
 
const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().user?._id;

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

export const regionalPastorLogin = (data) => {
  return dispatch => {
    dispatch(loginStart());
    fetch(`${BASE_URL}/regional_pastor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(loginFailed(resp.message));
        Auth.authenticateUser(JSON.stringify(resp.results));
        dispatch(loginSuccess(resp.results));
      })
      .catch(err => dispatch(loginFailed(err.message)));
  }
}


export const add_regional_pastor_start = () => {
  return {
    type: ADD_REGIONAL_PASTOR_START
  }
}

export const add_regional_pastor_success = (data) => {
  return {
    type: ADD_REGIONAL_PASTOR_SUCCESS,
    data
  }
}

export const add_regional_pastor_failed = (error) => {
  return {
    type: ADD_REGIONAL_PASTOR_FAILED,
    error
  }
}

export const add_regional_pastor = (data) => {
  return dispatch => {
    dispatch(add_regional_pastor_start());
    fetch(`${BASE_URL}/regional_pastor/new`, {
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
        if (resp.error) return dispatch(add_regional_pastor_failed(resp.message));
        return dispatch(add_regional_pastor_success(resp.results));
      })
      .catch(err => dispatch(add_regional_pastor_failed(err.message)));
  }
}

export const regional_pastor_list_start = () => {
  return {
    type: REGIONAL_PASTOR_LIST_START
  }
}

export const regional_pastor_list_success = (data) => {
  return {
    type: REGIONAL_PASTOR_LIST_SUCCESS,
    data
  }
}

export const regional_pastor_list_failed = (error) => {
  return {
    type: REGIONAL_PASTOR_LIST_FAILED,
    error
  }
}

export const regional_pastor_list = (offset, limit) => {
  return dispatch => {
    dispatch(regional_pastor_list_start());
    fetch(`${BASE_URL}/regional_pastor/all?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(regional_pastor_list_failed(resp.message));
        return dispatch(regional_pastor_list_success(resp.results));
      })
      .catch(err => dispatch(regional_pastor_list_failed(err.message)));
  }
}

export const churches_start = () => {
  return {
    type: CHURCH_LIST_START
  }
}

export const churches_success = (data) => {
  return {
    type: CHURCH_LIST_SUCCESS,
    data
  }
}

export const churches_failed = (error) => {
  return {
    type: CHURCH_LIST_FAILED,
    error
  }
}

export const church_list = (offset, limit) => {
  return dispatch => {
    dispatch(churches_start());
    fetch(`${BASE_URL}/regional_pastor/church_list?regional_pastor_id=${id}&offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(churches_failed(resp.message));
        return dispatch(churches_success(resp.results));
      })
      .catch(err => dispatch(churches_failed(err.message)));
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
    fetch(`${BASE_URL}/regional_pastor/assign_church`, {
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

export const update_regional_pastor_start = () => {
  return {
    type: UPDATE_REGIONAL_PASTOR_START
  }
}

export const update_regional_pastor_success = (data) => {
  return {
    type: UPDATE_REGIONAL_PASTOR_SUCCESS,
    data
  }
}

export const update_regional_pastor_failed = (error) => {
  return {
    type: UPDATE_REGIONAL_PASTOR_FAILED,
    error
  }
}

export const update_regional_pastor = (data) => {
  return dispatch => {
    dispatch(update_regional_pastor_start());
    fetch(`${BASE_URL}/regional_pastor/update`, {
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
        if (resp.error) return dispatch(update_regional_pastor_failed(resp.message));
        return dispatch(update_regional_pastor_success(resp.results));
      })
      .catch(err => dispatch(update_regional_pastor_failed(err.message)));
  }
}

export const delete_regional_pastor_start = () => {
  return {
    type: DELETE_REGIONAL_PASTOR_START
  }
}

export const delete_regional_pastor_success = (data) => {
  return {
    type: DELETE_REGIONAL_PASTOR_SUCCESS,
    data
  }
}

export const delete_regional_pastor_failed = (error) => {
  return {
    type: DELETE_REGIONAL_PASTOR_FAILED,
    error
  }
}

export const delete_regional_pastor = (id) => {
  return dispatch => {
    dispatch(delete_regional_pastor_start());
    fetch(`${BASE_URL}/regional_pastor/delete?regional_pastor_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(delete_regional_pastor_failed(resp.message));
        return dispatch(delete_regional_pastor_success(resp.results));
      })
      .catch(err => dispatch(delete_regional_pastor_failed(err.message)));
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

export const search_regional_pastors = (search_term) => {
  return dispatch => {
    dispatch(search_start());
    fetch(`${BASE_URL}/regional_pastor/search?searchTerm=${search_term}`, {
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

export const filter_regional_pastors = (data) => {
  return dispatch => {
    dispatch(filter_start());
    fetch(`${BASE_URL}/regional_pastor/filter?time_range=${data}`, {
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