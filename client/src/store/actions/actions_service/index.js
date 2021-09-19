
import { localAuth } from "../../../helper/authenticate";

export const CREATE_SERVICE_START = "CREATE_SERVICE_START";
export const CREATE_SERVICE_SUCCESS = "CREATE_SERVICE_SUCCESS";
export const CREATE_SERVICE_FAILED = "CREATE_SERVICE_FAILED";
export const SERVICE_LIST_START = "SERVICE_LIST_START";
export const SERVICE_LIST_SUCCESS = "SERVICE_LIST_SUCCESS";
export const SERVICE_LIST_FAILED = "SERVICE_LIST_FAILED";
export const GET_SERVICE_START = "GET_SERVICE_START";
export const GET_SERVICE_SUCCESS = "GET_SERVICE_SUCCESS";
export const GET_SERVICE_FAILED = "GET_SERVICE_FAILED";
export const UPDATE_START = "UPDATE_START";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";
export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILED = "DELETE_FAILED";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const church = localAuth().church && localAuth().church._id;

export const createStart = () => {
  return {
    type: CREATE_SERVICE_START
  }
}

export const createSuccess = (data) => {
  return {
    type: CREATE_SERVICE_SUCCESS,
    data
  }
}

export const createFailed = (error) => {
  return {
    type: CREATE_SERVICE_FAILED,
    error
  }
}

export const createService = (data) => {
  return dispatch => {
    dispatch(createStart());
    fetch(`${BASE_URL}/service/new`, {
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
      // .then(() => dispatch(birthdayList()))
      .catch(err => dispatch(createFailed(err.message)));
  }
}

export const listStart = () => {
  return {
    type: SERVICE_LIST_START
  }
}

export const listSuccess = (data) => {
  return {
    type: SERVICE_LIST_SUCCESS,
    data
  }
}

export const listFailed = (error) => {
  return {
    type: SERVICE_LIST_FAILED,
    error
  }
}

export const serviceList = (offset, limit) => {
  return dispatch => {
    dispatch(listStart());
    fetch(`${BASE_URL}/service/all/${church}?offset=${offset}&limit=${limit}`, {
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

export const updateService = (data) => {
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/service/update`, {
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

export const serviceStart = () => {
  return {
    type: GET_SERVICE_START
  }
}

export const serviceSuccess = (data) => {
  return {
    type: GET_SERVICE_SUCCESS,
    data
  }
}

export const serviceFailed = (error) => {
  return {
    type: GET_SERVICE_FAILED,
    error
  }
}

export const getservice = () => {
  return dispatch => {
    dispatch(serviceStart());
    fetch(`${BASE_URL}/service/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(serviceFailed(resp.message));
        dispatch(serviceSuccess(resp.results));
      })
      .catch(err => {
        dispatch(serviceFailed(err.message))
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
export const deleteService = (eventId) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/service/${church}/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.message));
        dispatch(deleteSuccess(resp.results));
      })
      .then(() => dispatch(serviceList()))
      .catch(err => {
        dispatch(deleteFailed(err.message));
      });
  }
}

export const searchStart = () => {
  return {
    type: SEARCH_START
  }
}

export const searchSuccess = (data) => {
  return {
    type: SEARCH_SUCCESS,
    data
  }
}


export const searchFailed = (error) => {
  return {
    type: SEARCH_FAILED,
    error
  }
}

export const searchService = (searchTerm) => {
  return dispatch => {
    dispatch(searchStart());
    fetch(`${BASE_URL}/service/search?church=${church}&searchTerm=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(searchFailed(resp.message));
        dispatch(searchSuccess(resp.results));
      })
      .catch(err => {
        dispatch(searchFailed(err.message));
      });
  }
}
