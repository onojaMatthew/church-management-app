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

export const fetchExpenditure = (data) => {
  return dispatch => {
    dispatch(fetchExpenditureStart());
    fetch(`${BASE_URL}/expenditure/all?church=${church}`, {
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
    type: CREATE_EXPENDITURE_START
  }
}

export const deleteExpenditureSuccess = (data) => {
  return {
    type: CREATE_EXPENDITURE_SUCCESS,
    data
  }
}

export const deleteExpenditureFailed = (error) => {
  return {
    type: CREATE_EXPENDITURE_FAILED,
    error
  }
}

export const deleteExpenditure = (data) => {
  return dispatch => {
    dispatch(deleteExpenditureStart());
    fetch(`${BASE_URL}/expenditure/new`, {
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