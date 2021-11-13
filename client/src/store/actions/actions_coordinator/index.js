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

 
const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;

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
    fetch(`${BASE_URL}/coordinator/new`, {
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
        if (resp.error) return dispatch(add_coordinator_failed(resp.message));
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

export const add_coordinator = (offset, limit) => {
  return dispatch => {
    dispatch(add_coordinator_start());
    fetch(`${BASE_URL}/coordinator/all?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(add_coordinator_failed(resp.message));
        return dispatch(add_coordinator_success(resp.results));
      })
      .catch(err => dispatch(add_coordinator_failed(err.message)));
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

export const coordinating_church_list = () => {
  return dispatch => {
    dispatch(coordinator_churches_start());
    fetch(`${BASE_URL}/coordinator/all?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(coordinator_churches_failed(resp.message));
        return dispatch(coordinator_churches_success(resp.results));
      })
      .catch(err => dispatch(coordinator_churches_failed(err.message)));
  }
  
}