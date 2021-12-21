import Auth from "../../../helper/Auth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const FORGOT_PASSWORD_START = "FORGOT_PASSWORD_START";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const VALIDATION_ERROR = "VALIDATION_ERROR";

const BASE_URL = process.env.REACT_APP_URL;

export const validationError = (error) => {
  return {
    type: VALIDATION_ERROR,
    error
  }
}

export const loginStart = () => {
  return {
    type: LOGIN_START
  }
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export const login = (data) => {
  return dispatch => {
    dispatch(loginStart());
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error && resp.error !== "validation errors") return dispatch(loginFailed(resp.message));
        if (resp.error && resp.error === "validation errors") return dispatch(validationError(resp.message));
        Auth.authenticateUser(JSON.stringify(resp.results))
        dispatch(loginSuccess(resp.results));
      })
      .catch(err => dispatch(loginFailed(err.message)));
  }
}

export const logoutStart = () => {
  return {
    type: LOGOUT_START
  }
}

export const logoutSuccess = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    data
  }
}

export const logoutFailed = (error) => {
  return {
    type: LOGOUT_FAILED,
    error
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logoutStart());
    fetch(`${BASE_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(logoutFailed(resp.message));
        Auth.deauthenticateUser();
        dispatch(logoutSuccess(resp.message));
      })
      .catch(err => dispatch(logoutFailed(err.message)));
  }
}

export const forgotPasswordStart = () => {
  return {
    type: FORGOT_PASSWORD_START
  }
}

export const forgotPasswordSuccess = (data) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    data
  }
}

export const forgotPasswordFailed = (error) => {
  return {
    type: FORGOT_PASSWORD_FAILED,
    error
  }
}

export const forgotPassword = (data) => {
  return dispatch => {
    dispatch(forgotPasswordStart());
    fetch(`${BASE_URL}/auth/forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error && resp.message === "Validation errors") return dispatch(forgotPasswordStart(resp.message));
        if (resp.error && resp.message === "Validation errors") return dispatch(validationError(resp.message));
        dispatch(forgotPasswordSuccess(resp.results));
      })
      .catch(err => dispatch(forgotPasswordFailed(err.message)));
  }
}

export const resetPasswordStart = () => {
  return {
    type: RESET_PASSWORD_START
  }
}

export const resetPasswordSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data
  }
}

export const resetPasswordFailed = (error) => {
  return {
    type: RESET_PASSWORD_FAILED,
    error
  }
}

export const resetPassword = (data) => {
  return dispatch => {
    dispatch(resetPasswordStart());
    fetch(`${BASE_URL}/auth/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error && resp.message === "Validation errors") return dispatch(resetPasswordStart(resp.message));
        if (resp.error && resp.message === "Validation errors") return dispatch(validationError(resp.message));
        dispatch(resetPasswordSuccess(resp.results));
      })
      .catch(err => dispatch(resetPasswordFailed(err.message)));
  }
}