
import { localAuth } from "../../../helper/authenticate";

export const CREATE_BURIAL_START = "CREATE_BURIAL_START";
export const CREATE_BURIAL_SUCCESS = "CREATE_BURIAL_SUCCESS";
export const CREATE_BURIAL_FAILED = "CREATE_BURIAL_FAILED";
export const BURIAL_LIST_START = "SERVICE_LIST_START";
export const BURIAL_LIST_SUCCESS = "BURIAL_LIST_SUCCESS";
export const BURIAL_LIST_FAILED = "BURIAL_LIST_FAILED";
export const GET_BURIAL_START = "GET_BURIAL_START";
export const GET_BURIAL_SUCCESS = "GET_BURIAL_SUCCESS";
export const GET_BURIAL_FAILED = "GET_BURIAL_FAILED";
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
    type: CREATE_BURIAL_START
  }
}

export const createSuccess = (data) => {
  return {
    type: CREATE_BURIAL_SUCCESS,
    data
  }
}

export const createFailed = (error) => {
  return {
    type: CREATE_BURIAL_FAILED,
    error
  }
}

export const createBurial = (data) => {
  return dispatch => {
    dispatch(createStart());
    fetch(`${BASE_URL}/burial/new`, {
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
    type: BURIAL_LIST_START
  }
}

export const listSuccess = (data) => {
  return {
    type: BURIAL_LIST_SUCCESS,
    data
  }
}

export const listFailed = (error) => {
  return {
    type: BURIAL_LIST_FAILED,
    error
  }
}

export const burialList = (offset, limit) => {
  return dispatch => {
    dispatch(listStart());
    fetch(`${BASE_URL}/burial/all/${church}?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        console.log(resp, " the data")
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

export const updateBurial = (data) => {
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/burial/update`, {
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

export const burialStart = () => {
  return {
    type: GET_BURIAL_START
  }
}

export const burialSuccess = (data) => {
  return {
    type: GET_BURIAL_SUCCESS,
    data
  }
}

export const burialFailed = (error) => {
  return {
    type: GET_BURIAL_FAILED,
    error
  }
}

export const getBurial = () => {
  return dispatch => {
    dispatch(burialStart());
    fetch(`${BASE_URL}/burial/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(burialFailed(resp.message));
        dispatch(burialSuccess(resp.results));
      })
      .catch(err => {
        dispatch(burialFailed(err.message))
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
export const deleteBurial = (id) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/burial/delete?church=${church}&serviceId=${id}`, {
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

export const searchBurial = (searchTerm) => {
  return dispatch => {
    dispatch(searchStart());
    fetch(`${BASE_URL}/burial/search?church=${church}&searchTerm=${searchTerm}`, {
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
