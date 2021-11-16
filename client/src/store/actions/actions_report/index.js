import { localAuth } from "../../../helper/authenticate";

export const CREATE_REPORT_START = "CREATE_REPORT_START";
export const CREATE_REPORT_SUCCESS = "CREATE_REPORT_SUCCESS";
export const CREATE_REPORT_FAILED = "CREATE_REPORT_FAILED";
export const REPORT_LIST_START = "REPORT_LIST_START";
export const REPORT_LIST_SUCCESS = "REPORT_LIST_SUCCESS";
export const REPORT_LIST_FAILED = "REPORT_LIST_FAILED";
export const REPORT_DETAIL_START = "REPORT_DETAIL_START";
export const REPORT_DETAIL_SUCCESS = "REPORT_DETAIL_SUCCESS";
export const REPORT_DETAIL_FAILED = "REPORT_DETAIL_FAILED";
export const CHURCH_REPORTS_START = "CHURCH_REPORTS_START";
export const CHURCH_REPORTS_SUCCESS = "CHURCH_REPORTS_SUCCESS";
export const CHURCH_REPORTS_FAILED = "CHURCH_REPORTS_FAILED";
export const COORDINATOR_REPORT_START = "COORDINATOR_REPORT_START";
export const COORDINATOR_REPORT_SUCCESS = "COORDINATOR_REPORT_SUCCESS";
export const COORDINATOR_REPORT_FAILED = "COORDINATOR_REPORT_FAILED";
export const DELETE_REPORT_START = "DELETE_REPORT_START";
export const DELETE_REPORT_SUCCESS = "DELETE_REPORT_SUCCESS";
export const DELETE_REPORT_FAILED = "DELETE_REPORT_SFAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

const BASE_URL = process.env.REACT_APP_URL;

export const createReportStart = () => {
  return {
    type: CREATE_REPORT_START
  }
}

export const createReportSuccess = (data) => {
  return {
    type: CREATE_REPORT_SUCCESS,
    data
  }
}

export const createReportFailed = (error) => {
  return {
    type: CREATE_REPORT_FAILED,
    error
  }
}

export const createReport = (data) => {
  return dispatch => {
    dispatch(createReportStart());
    fetch(`${BASE_URL}/report/new`, {
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
        if (resp.error) return dispatch(createReportFailed(resp.message));
        return dispatch(createReportSuccess(resp.results));
      })
      .catch(err => {
        dispatch(createReportFailed(err.message));
      })
  }
}

export const reportListStart = () => {
  return {
    type: REPORT_LIST_START
  }
}

export const reportListSuccess = (data) => {
  return {
    type: REPORT_LIST_SUCCESS,
    data
  }
}

export const reportListFailed = (error) => {
  return {
    type: REPORT_LIST_FAILED,
    error
  }
}

export const reportList = () => {
  return dispatch => {
    dispatch(reportListStart());
    fetch(`${BASE_URL}/report/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(reportListFailed(resp.message));
        dispatch(reportListSuccess(resp.results));
      })
      .catch(err => {
        dispatch(reportListFailed(err.message));
      });
  }
}

export const churchReportsStart = () => {
  return {
    type: CHURCH_REPORTS_START
  }
}

export const churchReportsSuccess = (data) => {
  return {
    type: CHURCH_REPORTS_SUCCESS,
    data
  }
}

export const churchReportsFailed = (error) => {
  return {
    type: CHURCH_REPORTS_FAILED,
    error
  }
}

export const churchReports = () => {
  return dispatch => {
    dispatch(churchReportsStart());
    fetch(`${BASE_URL}/report/church_reports?church=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(churchReportsFailed(resp.message));
        dispatch(churchReportsSuccess(resp.results));
      })
      .catch(err => {
        dispatch(churchReportsFailed(err.message));
      });
  }
}

export const reportDetailsStart = () => {
  return {
    type: REPORT_DETAIL_START
  }
}

export const reportDetailsSuccess = (data) => {
  return {
    type: REPORT_DETAIL_SUCCESS,
    data
  }
}

export const reportDetailsFailed = (error) => {
  return {
    type: REPORT_DETAIL_FAILED,
    error
  }
}

export const reportDetails = (id) => {
  return dispatch => {
    dispatch(reportDetailsStart());
    fetch(`${BASE_URL}/report/details?reportId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(reportDetailsFailed(resp.message));
        dispatch(reportDetailsSuccess(resp.results));
      })
      .catch(err => {
        dispatch(reportDetailsFailed(err.message));
      });
  }
}

export const coordinator_report_start = () => {
  return {
    type: COORDINATOR_REPORT_START
  }
}

export const coordinator_report_success = (data) => {
  return {
    type: COORDINATOR_REPORT_SUCCESS,
    data
  }
}

export const coordinator_report_failed = (error) => {
  return {
    type: COORDINATOR_REPORT_FAILED,
    error
  }
}

export const coordinator_reports = (id, offset, limit) => {
  return dispatch => {
    dispatch(coordinator_report_start());
    fetch(`${BASE_URL}/report/coordinator_reports?coordinatorId=${id}&limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(coordinator_report_failed(resp.message));
        dispatch(coordinator_report_success(resp.results));
      })
      .catch(err => {
        dispatch(coordinator_report_failed(err.message));
      });
  }
}

export const delete_report_start = () => {
  return {
    type: DELETE_REPORT_START
  }
}

export const delete_report_success = (data) => {
  return {
    type: DELETE_REPORT_SUCCESS,
    data
  }
}
export const delete_report_failed = (error) => {
  return {
    type: DELETE_REPORT_FAILED,
    error
  }
}

export const deleteReport = (id) => {
  return dispatch => {
    dispatch(delete_report_start());
    fetch(`${BASE_URL}/report/delete?reportId=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(delete_report_failed(resp.message));
        dispatch(delete_report_success(resp.results));
      })
      .catch(err => {
        dispatch(delete_report_failed(err.message));
      });
  }
}