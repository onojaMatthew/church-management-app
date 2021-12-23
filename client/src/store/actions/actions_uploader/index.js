export const UPLOAD_START = "UPLOAD_START";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILED = "UPLOAD_FAILED";

const cloudinaryName = process.env.REACT_APP_CLOUD_NAME;

export const uploadStart = () => {
  return {
    type: UPLOAD_START
  }
}

export const uploadSuccess = (data) => {
  return {
    type: UPLOAD_SUCCESS,
    data
  }
}

export const uploadFailed = (error) => {
  return {
    type: UPLOAD_FAILED,
    error
  }
}

export const upload = (data) => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append('upload_preset', "achapp");
  const config = {
    method: "POST",
    body: formData
  }
  return dispatch => {
    dispatch(uploadStart());
    fetch(`https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`, config)
      .then(response => response.json())
      .then(resp => {
        dispatch(uploadSuccess(resp));
      })
      .catch(err => {
        dispatch(uploadFailed("Request failed"));
      });
  }
}