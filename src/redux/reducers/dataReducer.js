import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM
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
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => action.payload.screamId === scream.screamId
      );
      state.screams[index] = action.payload;
      return {
        ...state
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload 
        )
      };
    default:
      return state;
  }
};