import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_SCREAM,
  SET_COMMENTS,
  CLEAR_SCREAM,
  SET_PROFILE,
  CLEAR_PROFILE,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  EDIT_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  LOADING_UI,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

// Get all screams
export const fetchScreams = (screamsUrl) => (dispatch) => {
  dispatch({ type: LOADING_SCREAMS });
  console.log(screamsUrl);
  axios.get(screamsUrl)
    .then(res => {
      if(res) {
        console.log(res.data);
        dispatch(setScreams(res.data));
        dispatch(clearErrors());
      }
      dispatch({ type: STOP_LOADING_SCREAMS });
    })
    .catch(err => {
      console.log(err);
      dispatch(setScreams([]));
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_SCREAMS });
    });
};

// Set screams
export const setScreams = (data) => (dispatch) => {
  dispatch({
    type: SET_SCREAMS,
    payload: data
  });
};

// Get one scream
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const clearScream = () => (dispatch) => {
  dispatch({ type: CLEAR_SCREAM });
};

// Post a scream
export const postScream = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  axios.post('/scream', formData, config)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_UI });
    });
};

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios.post(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({ 
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios.delete(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchCommentsByScreamId = (screamId) => (dispatch) => {
  //dispatch({ type: LOADING_UI });
  axios.get(`/scream/${screamId}/comments`)
    .then((res) => {
      dispatch({
        type: SET_COMMENTS,
        payload: {
          screamId: screamId,
          comments: res.data.collection
        }
      });
      dispatch(clearErrors());
      //dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch(setErrors(err));
      //dispatch({ type: STOP_LOADING_UI });
    });
};

// Submit a Comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios.post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err
      });
    });
};

export const updateComment = (commentId, commentData) => (dispatch) => {

};

export const deleteComment = (commentId) => (dispatch) => {

};

// Get all User Data
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const fetchProfile = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const clearProfile = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

export const editScream = (screamId, bodyText) => (dispatch) => {
  let payload = {
    screamId: screamId,
    text: bodyText
  };
  axios.put(`/scream/${screamId}`, payload)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: EDIT_SCREAM,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Delete a scream
export const deleteScream = (screamId) => (dispatch) => {
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: STOP_LOADING_UI });
};

export const setErrors = (error) => (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload: error
  });
  dispatch({ type: STOP_LOADING_UI });
};