import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  CLEAR_ERRORS,
  SET_ERRORS,
} from '../types';
import axios from 'axios';

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
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: STOP_LOADING_SCREAMS });
    });
};

export const setScreams = (data) => (dispatch) => {
  dispatch({
    type: SET_SCREAMS,
    payload: data
  });
};