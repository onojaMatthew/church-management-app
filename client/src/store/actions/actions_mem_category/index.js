import { localAuth } from "../../../helper/authenticate";

export const CATEGORY_START = "CATEGORY_START";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAILED = "CATEGORY_FAILED";

export const CATEGORY_LIST_START = "CATEGORY_LIST_START";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILED = "CATEGORY_LIST_FAILED";

export const CREATE_CATEGORY_START = "CREATE_CATEGORY_START";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAILED = "CREATE_CATEGORY_FAILED";
export const UPDATE_CATEGORY_START = "UPDATE_CATEGORY_START";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_FAILED = "UPDATE_CATEGORY_FAILED";
export const DELETE_CATEGORY_START = "DELETE_CATEGORY_START";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

const BASE_URL = process.env.REACT_APP_URL;

export const categoryStart = () => {
  return {
    type: CATEGORY_START
  }
}

export const categorySuccess = (data) => {
  return {
    type: CATEGORY_SUCCESS,
    data
  }
}

export const categoryFailed = (error) => {
  return {
    type: CATEGORY_FAILED,
    error
  }
}


export const categoryDetail = (mem_id) => {
  return dispatch => {
    dispatch(categoryStart());
    fetch(`${BASE_URL}/mem_category/detail/${mem_id}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(categoryFailed(resp.message));
        return dispatch(categorySuccess(resp.results));
      })
      .catch(err => dispatch(categoryFailed(err.message)));
  }
}


export const categoryListStart = () => {
  return {
    type: CATEGORY_LIST_START
  }
}

export const categoryListSuccess = (data) => {
  return {
    type: CATEGORY_LIST_SUCCESS,
    data
  }
}

export const categoryListFailed = (error) => {
  return {
    type: CATEGORY_LIST_FAILED,
    error
  }
}


export const categoryList = () => {
  return dispatch => {
    dispatch(categoryListStart());
    fetch(`${BASE_URL}/mem_category/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(categoryListFailed(resp.message));
        return dispatch(categoryListSuccess(resp.results));
      })
      .catch(err => dispatch(categoryListFailed(err.message)));
  }
}

export const create_start = () => {
  return {
    type: CREATE_CATEGORY_START
  }
}

export const create_success = (data) => {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    data
  }
}

export const create_failed = (error) => {
  return {
    type: CREATE_CATEGORY_FAILED,
    error
  }
}

export const createCategory = (data) => {
  return dispatch => {
    dispatch(create_start());
    fetch(`${BASE_URL}/mem_category/new/${id}`, {
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
        if (resp.error) return dispatch(create_failed(resp.message));
        return dispatch(create_success(resp.results));
      })
      .catch(err => dispatch(create_failed(err.message)));
  }
}

export const update_start = () => {
  return {
    type: UPDATE_CATEGORY_START
  }
}

export const update_success = (data) => {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    data
  }
}

export const update_failed = (error) => {
  return {
    type: UPDATE_CATEGORY_FAILED,
    error
  }
}

export const updateCategory = (data) => {
  return dispatch => {
    dispatch(update_start());
    fetch(`${BASE_URL}/mem_category/update/${id}`, {
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
        if (resp.error) return dispatch(update_failed(resp.message));
        return dispatch(update_success(resp.results));
      })
      .catch(err => dispatch(update_failed(err.message)));
  }
}

export const delete_start = () => {
  return {
    type: DELETE_CATEGORY_START
  }
}

export const delete_success = (data) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    data
  }
}

export const delete_failed = (error) => {
  return {
    type: DELETE_CATEGORY_FAILED,
    error
  }
}

export const deleteCategory = () => {
  return dispatch => {
    dispatch(delete_start());
    fetch(`${BASE_URL}/mem_category/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(delete_failed(resp.message));
        return dispatch(delete_success(resp.results));
      })
      .catch(err => dispatch(delete_failed(err.message)));
  }
}