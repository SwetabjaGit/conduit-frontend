import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  SET_SCREAM,
  POST_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_SCREAM,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  nextHref: null,
  hasMoreItems: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREAMS:
      let screams = state.screams;
      console.log(screams);
      action.payload.collection.map(scream => {
        return screams.push(scream);
      });
      let hasMoreItemss = true;
      if(action.payload.next_href) {
        hasMoreItemss = true;
      } else {
        hasMoreItemss = false;
      }
      return {
        ...state,
        screams: screams,
        nextHref: action.payload.next_href,
        hasMoreItems: hasMoreItemss
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case CLEAR_SCREAM:
      const obj = {};
      return {
        ...state,
        scream: obj
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          ...state.screams,
          action.payload
        ]
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => action.payload.screamId === scream.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [
            action.payload,
            ...state.scream.comments
          ]
        }
      }
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