import Auth from "../../../helper/Auth";
import { localAuth } from "../../../helper/authenticate";

export const ALL_CHURCH_START = "ALL_CHURCH_START";
export const ALL_CHURCH_SUCCESS = "ALL_CHURCH_SUCCESS";
export const ALL_CHURCH_FAILED = "ALL_CHURCH_FAILED";

export const CREATE_CHURCH_START = "CREATE_CHURCH_START";
export const CREATE_CHURCH_SUCCESS = "CREATE_CHURCH_SUCCESS";
export const CREATE_CHURCH_FAILED = "CREATE_CHURCH_FAILED";

export const CHURCH_LOGIN_START = "CHURCH_LOGIN_START";
export const CHURCH_LOGIN_SUCCESS = "CHURCH_LOGIN_SUCCESS";
export const CHURCH_LOGIN_FAILED = "CHURCH_LOGIN_FAILED";

export const CHURCH_DETAILS_START = "CHURCH_DETAILS_START";
export const CHURCH_DETAILS_SUCCESS = "CHURCH_DETAILS_SUCCESS";
export const CHURCH_DETAILS_FAILED = "CHURCH_DETAILS_FAILED";

export const ALL_CHURCH_LIST_START = "ALL_CHURCH_LIST_START";
export const ALL_CHURCH_LIST_SUCCESS = "ALL_CHURCH_LIST_SUCCESS";
export const ALL_CHURCH_LIST_FAILED = "ALL_CHURCH_LIST_FAILED";

export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";

export const FILTER_START = "FILTER_START";
export const FILTER_SUCCESS = "FILTER_SUCCESS";
export const FILTER_FAILED = "FILTER_FAILED";

export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILED = "DELETE_FAILED";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;

export const allChurchStart = () => {
  return {
    type: ALL_CHURCH_START
  }
}

export const allChurchSuccess = (data) => {
  return {
    type: ALL_CHURCH_SUCCESS,
    data
  }
}

export const allChurchFailed = (error) => {
  return {
    type: ALL_CHURCH_FAILED,
    error
  }
}

export const churchList = (data) => {
  return dispatch => {
    dispatch(allChurchStart());
    fetch(`${BASE_URL}/church/all?offset=${data?.offset}&limit=${data?.limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(allChurchFailed(resp.message));
        return dispatch(allChurchSuccess(resp.results));
      })
      .catch(err => dispatch(allChurchFailed(err.message)));
  }
}

export const createChurchStart = () => {
  return {
    type: CREATE_CHURCH_START
  }
}

export const createChurchSuccess = (data) => {
  return {
    type: CREATE_CHURCH_SUCCESS,
    data
  }
}

export const createChurchFailed = (error) => {
  return {
    type: CREATE_CHURCH_FAILED,
    error
  }
}

export const post_church = (data) => {
  return dispatch => {
    dispatch(createChurchStart());
    fetch(`${BASE_URL}/church/new`, {
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
        if (resp.error) return dispatch(createChurchFailed(resp.message));
        return dispatch(createChurchSuccess(resp.results));
      })
      .then(() => dispatch(churchList()))
      .catch(err => dispatch(createChurchFailed(err.message)));
  }
}

export const churchLoginStart = () => {
  return {
    type: CHURCH_LOGIN_START
  }
}

export const churchLoginSuccess = (data) => {
  return {
    type: CHURCH_LOGIN_SUCCESS,
    data
  }
}

export const churchLoginFailed = (error) => {
  return {
    type: CHURCH_LOGIN_FAILED,
    error
  }
}

export const churchLogin = (data) => {
  return dispatch => {
    dispatch(churchLoginStart());
    fetch(`${BASE_URL}/church/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(churchLoginFailed(resp.message));
        Auth.authenticateUser(JSON.stringify(resp.results));
        dispatch(churchLoginSuccess(resp.results));
      })
      .catch(err => dispatch(churchLoginFailed("Network error")));
  }
}

export const churchDetailsStart = () => {
  return {
    type: CHURCH_DETAILS_START
  }
}

export const churchDetailsSuccess = (data) => {
  return {
    type: CHURCH_DETAILS_SUCCESS,
    data
  }
}

export const churchDetailsFailed = (error) => {
  return {
    type: CHURCH_DETAILS_FAILED,
    error
  }
}

export const churchDetails = (church) => {
  return dispatch => {
    dispatch(churchDetailsStart());
    fetch(`${BASE_URL}/church/detail/${church}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(churchDetailsFailed(resp.message));
        return dispatch(churchDetailsSuccess(resp.results));
      })
      .catch(err => dispatch(churchDetailsFailed(err.message)));
  }
}

export const all_church_list_start = () => {
  return {
    type: ALL_CHURCH_LIST_START
  }
}

export const all_church_list_success = (data) => {
  return {
    type: ALL_CHURCH_LIST_SUCCESS,
    data
  }
}

export const all_church_list_failed = (error) => {
  return {
    type: ALL_CHURCH_LIST_FAILED,
    error
  }
}

export const fetch_all_church = () => {
  return dispatch => {
    dispatch(all_church_list_start());
    fetch(`${BASE_URL}/church/all/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(all_church_list_failed(resp.message));
        return dispatch(all_church_list_success(resp.results));
      })
      .catch(err => dispatch(all_church_list_failed(err.message)));
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

export const search_church = (searchTerm) => {
  return dispatch => {
    dispatch(search_start());
    fetch(`${BASE_URL}/church/search?searchTerm=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
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

export const filter_church = (data) => {
  return dispatch => {
    dispatch(filter_start());
    fetch(`${BASE_URL}/church/filter?time_range=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(filter_failed(resp.message));
        return dispatch(filter_success(resp.results));
      })
      .catch(err => dispatch(filter_failed(err.message)));
  }
}

export const delete_start = () => {
  return {
    type: DELETE_START
  }
}

export const delete_success = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
}

export const delete_failed = (error) => {
  return {
    type: DELETE_FAILED,
    error
  }
}

export const delete_church = (id) => {
  return dispatch => {
    dispatch(delete_start());
    fetch(`${BASE_URL}/church/delete?church=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(delete_failed(resp.message));
        return dispatch(delete_success(resp.results));
      })
      .catch(err => dispatch(delete_failed(err.message)));
  }
}