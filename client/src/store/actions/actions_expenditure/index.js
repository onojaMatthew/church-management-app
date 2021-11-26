import { localAuth } from "../../../helper/authenticate";

export const CREATE_EXPENDITURE_START = "CREATE_EXPENDITURE_START";
export const CREATE_EXPENDITURE_SUCCESS = "CREATE_EXPENDITURE_SUCCESS";
export const CREATE_EXPENDITURE_FAILED = "CREATE_EXPENDITURE_FAILED";
export const FETCH_EXPENDITURE_START = "FETCH_EXPENDITURE_START";
export const FETCH_EXPENDITURE_SUCCESS = "FETCH_EXPENDITURE_SUCCESS";
export const FETCH_EXPENDITURE_FAILED = "FETCH_EXPENDITURE_FAILED";
export const UPDATE_EXPENDITURE_START = "UPDATE_EXPENDITURE_START";
export const UPDATE_EXPENDITURE_SUCCESS = "UPDATE_EXPENDITURE_SUCCESS";
export const UPDATE_EXPENDITURE_FAILED = "UPDATE_EXPENDITURE_FAILED";
export const DELETE_EXPENDITURE_START = "DELETE_EXPENDITURE_START";
export const DELETE_EXPENDITURE_SUCCESS = "DELETE_EXPENDITURE_SUCCESS";
export const DELETE_EXPENDITURE_FAILED = "DELETE_EXPENDITURE_FAILED";
export const FILTER_START = "FILTER_START";
export const FILTER_SUCCESS = "FILTER_SUCCESS";
export const FILTER_FAILED = "FILTER_FAILED";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";
export const TOTAL_START = "TOTAL_START";
export const TOTAL_SUCCESS = "TOTAL_SUCCESS";
export const TOTAL_FAILED = "TOTAL_FAILED";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const church = localAuth().church && localAuth().church._id;

export const createExpenditureStart = () => {
  return {
    type: CREATE_EXPENDITURE_START
  }
}

export const createExpenditureSuccess = (data) => {
  return {
    type: CREATE_EXPENDITURE_SUCCESS,
    data
  }
}

export const createExpenditureFailed = (error) => {
  return {
    type: CREATE_EXPENDITURE_FAILED,
    error
  }
}

export const createExpenditure = (data) => {
  return dispatch => {
    dispatch(createExpenditureStart());
    fetch(`${BASE_URL}/expenditure/new`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) return dispatch(createExpenditureFailed(result.message));
        dispatch(createExpenditureSuccess(result.results));
      })
      .catch(err => dispatch(createExpenditureFailed(err.message)));
  }
}

export const fetchExpenditureStart = () => {
  return {
    type: FETCH_EXPENDITURE_START
  }
}

export const fetchExpenditureSuccess = (data) => {
  return {
    type: FETCH_EXPENDITURE_SUCCESS,
    data
  }
}

export const fetchExpenditureFailed = (error) => {
  return {
    type: FETCH_EXPENDITURE_FAILED,
    error
  }
}

export const fetchExpenditure = (churchId, offset, limit) => {
  return dispatch => {
    dispatch(fetchExpenditureStart());
    fetch(`${BASE_URL}/expenditure/all?church=${churchId}&offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) return dispatch(fetchExpenditureFailed(result.message));
        dispatch(fetchExpenditureSuccess(result.results));
      })
      .catch(err => dispatch(fetchExpenditureFailed(err.message)));
  }
}

export const updateExpenditureStart = () => {
  return {
    type: UPDATE_EXPENDITURE_START
  }
}

export const updateExpenditureSuccess = (data) => {
  return {
    type: UPDATE_EXPENDITURE_SUCCESS,
    data
  }
}

export const updateExpenditureFailed = (error) => {
  return {
    type: UPDATE_EXPENDITURE_FAILED,
    error
  }
}

export const updateExpenditure = (data) => {
  return dispatch => {
    dispatch(updateExpenditureStart());
    fetch(`${BASE_URL}/expenditure/new`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) return dispatch(updateExpenditureFailed(result.message));
        dispatch(updateExpenditureSuccess(result.results));
      })
      .catch(err => dispatch(updateExpenditureFailed(err.message)));
  }
}

export const deleteExpenditureStart = () => {
  return {
    type: DELETE_EXPENDITURE_START
  }
}

export const deleteExpenditureSuccess = (data) => {
  return {
    type: DELETE_EXPENDITURE_SUCCESS,
    data
  }
}

export const deleteExpenditureFailed = (error) => {
  return {
    type: DELETE_EXPENDITURE_FAILED,
    error
  }
}

export const deleteExpenditure = (id) => {
  return dispatch => {
    dispatch(deleteExpenditureStart());
    fetch(`${BASE_URL}/expenditure/delete?church=${church}&expenditure_id=${id}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) return dispatch(deleteExpenditureFailed(result.message));
        dispatch(deleteExpenditureSuccess(result.results));
      })
      .catch(err => dispatch(deleteExpenditureFailed(err.message)));
  }
}

export const filterStart = () => {
  return {
    type: FILTER_START
  }
}

export const filterSuccess = (data) => {
  return {
    type: FILTER_SUCCESS,
    data
  }
}

export const filterFailed = (error) => {
  return {
    type: FILTER_FAILED,
    error
  }
}

export const filter_expenditure = (time_range) => {
  return dispatch => {
    dispatch(filterStart());
    fetch(`${BASE_URL}/expenditure/filter?church=${church}&time_range=${time_range}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(filterFailed(resp.message));
        dispatch(filterSuccess(resp.results));
      })
      .catch(err => {
        dispatch(filterFailed(err.message));
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

export const search_expenditure = (searchTerm) => {
  return dispatch => {
    dispatch(searchStart());
    fetch(`${BASE_URL}/expenditure/search?church=${church}&searchTerm=${searchTerm}`, {
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

export const totalStart = () => {
  return {
    type: TOTAL_START
  }
}

export const totalSuccess = (data) => {
  return {
    type: TOTAL_SUCCESS,
    data
  }
}

export const totalFailed = (error) => {
  return {
    type: TOTAL_FAILED,
    error
  }
}

export const getTotal = (church) => {
  return dispatch => {
    dispatch(totalStart());
    fetch(`${BASE_URL}/expenditure/total?church=${church}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(totalFailed(resp.message));
        dispatch(totalSuccess(resp.results));
      })
      .catch(err => dispatch(totalFailed(err.message)));
  }
}