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

export const coordinator_list = (offset, limit) => {
  return dispatch => {
    dispatch(coordinator_list_start());
    fetch(`${BASE_URL}/coordinator/all?offset=${offset}&limit=${limit}`, {
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
    fetch(`${BASE_URL}/coordinator/church_list?offset=${offset}&limit=${limit}`, {
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
    fetch(`${BASE_URL}/coordinator/assign_church`, {
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
    fetch(`${BASE_URL}/coordinator/update`, {
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
    fetch(`${BASE_URL}/coordinator/delete?coordinatorId=${id}`, {
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