import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_SCREAM,
  SET_COMMENTS,
  SET_PROFILE_COMMENTS,
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
  EDIT_COMMENT,
  DELETE_COMMENT,
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
  axios.get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
};

export const clearScream = () => (dispatch) => {
  dispatch({ type: CLEAR_SCREAM });
};

// Post a scream
export const postScream = (formData) => (dispatch) => {
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
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editScream = (scream) => (dispatch) => {
  axios.put(`/scream/${scream.screamId}`, scream)
    .then((res) => {
      console.log(`%c ${JSON.stringify(res.data)}`, 'color: orange');
      dispatch({
        type: EDIT_SCREAM,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

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

export const fetchCommentsByScreamId = (screamId, isProfile) => (dispatch) => {
  axios.get(`/scream/${screamId}/comments`)
    .then((res) => {
      if(isProfile === true) {
        dispatch({
          type: SET_PROFILE_COMMENTS,
          payload: {
            screamId: screamId,
            comments: res.data.collection
          }
        });
      } else {
        dispatch({
          type: SET_COMMENTS,
          payload: {
            screamId: screamId,
            comments: res.data.collection
          }
        });
      }
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
};

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

export const editComment = (comment) => (dispatch) => {
  axios.put(`/scream/editcomment/${comment.commentId}`, comment)
    .then((res) => {
      console.log({ comment: res.data});
      dispatch({
        type: EDIT_COMMENT,
        payload: {
          ...res.data,
          data: comment.data
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteComment = (commentId) => (dispatch) => {
  axios.delete(`/scream/deletecomment/${commentId}`)
    .then((res) => {
      console.log({ comment: res.data});
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
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