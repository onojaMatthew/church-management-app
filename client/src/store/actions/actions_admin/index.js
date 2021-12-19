import { localAuth } from "../../../helper/authenticate";

export const ADMIN_DETAILS_START = "ADMIN_DETAILS_START";
export const ADMIN_DETAILS_SUCCESS = "ADMIN_DETAILS_SUCCESS";
export const ADMIN_DETAILS_FAILED = "ADMIN_DETAILS_FAILED";
export const PROFILE_UPDATE_START = "PROFILE_UPDATE_START";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_UPDATE_FAILED = "PROFILE_UPDATE_FAILED";
export const CHURCH_LOGO_START = "CHURCH_LOGO_START";
export const CHURCH_LOGO_SUCCESS = "CHURCH_LOGO_SUCCESS";
export const CHURCH_LOGO_FAILED = "CHURCH_LOGO_FAILED";

const BASE_URL = process.env.REACT_APP_URL;
const token = localAuth()?.token;
const id = localAuth()?.user?._id

export const getAdminStart = () => {
  return {
    type: ADMIN_DETAILS_START
  }
}

export const getAdminSuccess = (data) => {
  return {
    type: ADMIN_DETAILS_SUCCESS,
    data
  }
}

export const getAdminFailed = (error) => {
  return {
    type: ADMIN_DETAILS_FAILED,
    error
  }
}

export const adminDetails = () => {
  return dispatch => {
    dispatch(getAdminStart());
    fetch(`${BASE_URL}/auth/admin/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getAdminFailed(resp.message));
        dispatch(getAdminSuccess(resp.results));
      })
      .catch(err => dispatch(getAdminFailed(err.message)));
  }
}


export const profileUpdateStart = () => {
  return {
    type: PROFILE_UPDATE_START
  }
}

export const profileUpdateSuccess = (data) => {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    data
  }
}

export const profileUpdateFailed = (error) => {
  return {
    type: PROFILE_UPDATE_FAILED,
    error
  }
}

export const adminProfile = (data) => {
  return dispatch => {
    dispatch(profileUpdateStart());
    fetch(`${BASE_URL}/auth/admin/${id}`, {
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
        if (resp.error) return dispatch(profileUpdateFailed(resp.message));
        dispatch(profileUpdateSuccess(resp.results));
      })
      .catch(err => dispatch(profileUpdateFailed(err.message)));
  }
}

export const churchLogoStart = () => {
  return {
    type: CHURCH_LOGO_START
  }
}

export const churchLogoSuccess = (data) => {
  return {
    type: CHURCH_LOGO_SUCCESS,
    data
  }
}

export const churchLogoFailed = (error) => {
  return {
    type: CHURCH_LOGO_FAILED,
    error
  }
}

export const churchLogo = () => {
  return dispatch => {
    dispatch(churchLogoStart());
    fetch(`${BASE_URL}/auth/admin/logo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(churchLogoFailed(resp.message));
        dispatch(churchLogoSuccess(resp.results));
      })
      .catch(err => dispatch(churchLogoFailed(err.message)));
  }
}