import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  LOADING_UI,
  STOP_LOADING_UI
} from '../types';
import axios from 'axios';

// Get all screams
export const fetchScreams = () => (dispatch) => {
  dispatch({ type: LOADING_SCREAMS });
  axios.get('/screams')
    .then(res => {
      console.log(res.data);
      dispatch(setScreams(res.data));
      dispatch(clearErrors());
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
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
};

// Post a scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/scream', newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
};

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios.get(`/scream/${screamId}/like`)
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
  axios.get(`/scream/${screamId}/unlike`)
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
    payload: error.response.data
  });
  dispatch({ type: STOP_LOADING_UI });
};