import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  CLEAR_ERRORS,
  SET_ERRORS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM
} from '../types';
import axios from 'axios';

// Get all screams
export const fetchScreams = () => (dispatch) => {
  dispatch({ type: LOADING_SCREAMS });
  axios.get('/screams')
    .then(res => {
      console.log(res.data);
      dispatch(setScreams(res.data));
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: STOP_LOADING_SCREAMS });
    })
    .catch(err => {
      console.log(err);
      dispatch(setScreams([]));
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
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

// Like screams
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

// Unlike Screams
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

export const deleteScream = (screamId) => (dispatch) => {
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ 
        type: DELETE_SCREAM,
        payload: screamId
      })
    })
    .catch(err => {
      console.log(err);
    });
}