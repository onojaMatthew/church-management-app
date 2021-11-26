import { localAuth } from "../../../helper/authenticate";
export const CREATE_INCOME_START = "CREATE_INCOME_START";
export const CREATE_INCOME_SUCCESS = "CREATE_INCOME_SUCCESS";
export const CREATE_INCOME_FAILED = "CREATE_INCOME_FAILED";
export const FETCH_LIST_INCOME_START = "FETCH_LIST_INCOME_START";
export const FETCH_LIST_INCOME_SUCCESS = "FETCH_LIST_INCOME_SUCCESS";
export const FETCH_LIST_INCOME_FAILED = "FETCH_LIST_INCOME_FAILED";
export const DELETE_INCOME_START = "DELETE_INCOME_START";
export const DELETE_INCOME_SUCCESS = "DELETE_INCOME_SUCCESS";
export const DELETE_INCOME_FAILED = "DELETE_INCOME_FAILED";
export const CATEGORY_LIST_START = "CATEGORY_LIST_START";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILED = "CATEGORY_LIST_FAILED";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const church = localAuth().church && localAuth().church._id;

export const createIncomeStart = () => {
  return {
    type: CREATE_INCOME_START
  }
}

export const createIncomeSuccess = (data) => {
  return {
    type: CREATE_INCOME_SUCCESS,
    data
  }
}

export const createIncomeFailed = (error) => {
  return {
    type: CREATE_INCOME_FAILED,
    error
  }
}

export const createIncome = (data) => {
  return dispatch => {
    dispatch(createIncomeStart());
    fetch(`${BASE_URL}/finance/new`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createIncomeFailed(resp.message));
        dispatch(createIncomeSuccess(resp.results));
      })
      .catch(err => dispatch(createIncomeFailed(err.message)));
  }
}


export const fetchIncomeStart = () => {
  return {
    type: FETCH_LIST_INCOME_START
  }
}

export const fetchIncomeSuccess = (data) => {
  return {
    type: FETCH_LIST_INCOME_SUCCESS,
    data
  }
}

export const fetchIncomeFailed = (error) => {
  return {
    type: FETCH_LIST_INCOME_FAILED,
    error
  }
}

export const fetchIncome = (churchId, offset, limit) => {
  return dispatch => {
    dispatch(fetchIncomeStart());
    fetch(`${BASE_URL}/finance/all?church=${churchId}&offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(fetchIncomeFailed(resp.message));
        dispatch(fetchIncomeSuccess(resp.results));
      })
      .catch(err => dispatch(fetchIncomeFailed(err.message)));
  }
}

export const deleteIncomeStart = () => {
  return {
    type: DELETE_INCOME_START
  }
}

export const deleteIncomeSuccess = (data) => {
  return {
    type: DELETE_INCOME_SUCCESS,
    data
  }
}

export const deleteIncomeFailed = (error) => {
  return {
    type: DELETE_INCOME_FAILED,
    error
  }
}

export const deleteIncome = (id) => {
  return dispatch => {
    dispatch(deleteIncomeStart());
    fetch(`${BASE_URL}/finance/delete?church=${church}&incomeId=${id}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteIncomeFailed(resp.message));
        dispatch(deleteIncomeSuccess(resp.results));
      })
      .catch(err => dispatch(deleteIncomeFailed(err.message)));
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

export const fetchIncomeCategory = (id) => {
  return dispatch => {
    dispatch(categoryListStart());
    fetch(`${BASE_URL}/fin_category/all?church=${church}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(categoryListFailed(resp.message));
        dispatch(categoryListSuccess(resp.results));
      })
      .catch(err => dispatch(categoryListFailed(err.message)));
  }
}
