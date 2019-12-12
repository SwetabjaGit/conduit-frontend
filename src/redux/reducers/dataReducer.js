import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS
} from '../types';

const initialState = {
  screams: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload
      };
    case LOADING_SCREAMS:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_SCREAMS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};