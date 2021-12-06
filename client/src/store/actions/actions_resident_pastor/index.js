import Auth from "../../../helper/Auth";
import { localAuth } from "../../../helper/authenticate";

export const ADD_RESIDENT_PASTOR_START = "ADD_RESIDENT_PASTOR_START";
export const ADD_RESIDENT_PASTOR_SUCCESS = "ADD_RESIDENT_PASTOR_SUCCESS";
export const ADD_RESIDENT_PASTOR_FAILED = "ADD_RESIDENT_PASTOR_FAILED";
export const RESIDENT_PASTOR_LIST_START = "RESIDENT_PASTOR_LIST_START";
export const RESIDENT_PASTOR_LIST_SUCCESS = "RESIDENT_PASTOR_LIST_SUCCESS";
export const RESIDENT_PASTOR_LIST_FAILED = "RESIDENT_PASTOR_LIST_FAILED";
export const ASSIGN_CHURCH_START = "ASSIGN_CHURCH_START";
export const ASSIGN_CHURCH_SUCCESS = "ASSIGN_CHURCH_SUCCESS";
export const ASSIGN_CHURCH_FAILED = "ASSIGN_CHURCH_FAILED";
export const DELETE_RESIDENT_PASTOR_START = "DELETE_RESIDENT_PASTOR_START";
export const DELETE_RESIDENT_PASTOR_SUCCESS = "DELETE_RESIDENT_PASTOR_SUCCESS";
export const DELETE_RESIDENT_PASTOR_FAILED = "DELETE_RESIDENT_PASTOR_FAILED";
export const CHURCH_LIST_START = "CHURCH_LIST_START";
export const CHURCH_LIST_SUCCESS = "CHURCH_LIST_SUCCESS";
export const CHURCH_LIST_FAILED = "CHURCH_LIST_FAILED";
export const UPDATE_RESIDENT_PASTOR_START = "UPDATE_RESIDENT_PASTOR_START";
export const UPDATE_RESIDENT_PASTOR_SUCCESS = "UPDATE_RESIDENT_PASTOR_SUCCESS";
export const UPDATE_RESIDENT_PASTOR_FAILED = "UPDATE_RESIDENT_PASTOR_FAILED";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";
export const FILTER_START = "FILTER_START";
export const FILTER_SUCCESS = "FILTER_SUCCESS";
export const FILTER_FAILED = "FILTER_FAILED";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().user?._id;

export const add_resident_pastor_start = () => {
  return {
    type: ADD_RESIDENT_PASTOR_START
  }
}

export const add_resident_pastor_success = (data) => {
  return {
    type: ADD_RESIDENT_PASTOR_SUCCESS,
    data
  }
}

export const add_resident_pastor_failed = (error) => {
  return {
    type: ADD_RESIDENT_PASTOR_FAILED,
    error
  }
}

export const add_resident_pastor = (data) => {
  return dispatch => {
    dispatch(add_resident_pastor_start());
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
        if (resp.error) return dispatch(add_resident_pastor_failed(resp.message));
        return dispatch(add_resident_pastor_success(resp.results));
      })
      .catch(err => dispatch(add_resident_pastor_failed(err.message)));
  }
}

export const resident_pastor_list_start = () => {
  return {
    type: RESIDENT_PASTOR_LIST_START
  }
}

export const resident_pastor_list_success = (data) => {
  return {
    type: RESIDENT_PASTOR_LIST_SUCCESS,
    data
  }
}

export const resident_pastor_list_failed = (error) => {
  return {
    type: RESIDENT_PASTOR_LIST_FAILED,
    error
  }
}

export const resident_pastor_list = (offset, limit) => {
  return dispatch => {
    dispatch(resident_pastor_list_start());
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
        if (resp.error) return dispatch(resident_pastor_list_failed(resp.message));
        return dispatch(resident_pastor_list_success(resp.results));
      })
      .catch(err => dispatch(resident_pastor_list_failed(err.message)));
  }
}

export const resident_pastor_churches_start = () => {
  return {
    type: CHURCH_LIST_START
  }
}

export const resident_pastor_churches_success = (data) => {
  return {
    type: CHURCH_LIST_SUCCESS,
    data
  }
}

export const resident_pastor_churches_failed = (error) => {
  return {
    type: CHURCH_LIST_FAILED,
    error
  }
}

export const church_list = (offset, limit) => {
  return dispatch => {
    dispatch(resident_pastor_churches_start());
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
        if (resp.error) return dispatch(resident_pastor_churches_failed(resp.message));
        return dispatch(resident_pastor_churches_success(resp.results));
      })
      .catch(err => dispatch(resident_pastor_churches_failed(err.message)));
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
    fetch(`${BASE_URL}/resident_pastor/assign_church`, {
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

export const update_resident_pastor_start = () => {
  return {
    type: UPDATE_RESIDENT_PASTOR_START
  }
}

export const update_resident_pastor_success = (data) => {
  return {
    type: UPDATE_RESIDENT_PASTOR_SUCCESS,
    data
  }
}

export const update_resident_pastor_failed = (error) => {
  return {
    type: UPDATE_RESIDENT_PASTOR_FAILED,
    error
  }
}

export const update_resident_pastor = (data) => {
  return dispatch => {
    dispatch(update_resident_pastor_start());
    fetch(`${BASE_URL}/resident_pastor/update`, {
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
        if (resp.error) return dispatch(update_resident_pastor_failed(resp.message));
        return dispatch(update_resident_pastor_success(resp.results));
      })
      .catch(err => dispatch(update_resident_pastor_failed(err.message)));
  }
}

export const delete_coordinator_start = () => {
  return {
    type: DELETE_RESIDENT_PASTOR_START
  }
}

export const delete_coordinator_success = (data) => {
  return {
    type: DELETE_RESIDENT_PASTOR_SUCCESS,
    data
  }
}

export const delete_coordinator_failed = (error) => {
  return {
    type: DELETE_RESIDENT_PASTOR_FAILED,
    error
  }
}

export const delete_resident_pastor = (id) => {
  return dispatch => {
    dispatch(delete_coordinator_start());
    fetch(`${BASE_URL}/resident_pastor/delete?resident_pastor_id=${id}`, {
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

export const search_resident_pastor = (search_term) => {
  return dispatch => {
    dispatch(search_start());
    fetch(`${BASE_URL}/resident_pastor/search?searchTerm=${search_term}`, {
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

export const filter_resident_pastors = (data) => {
  return dispatch => {
    dispatch(filter_start());
    fetch(`${BASE_URL}/resident_pastor/filter?time_range=${data}`, {
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