import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  STOP_LOADING_SCREAMS,
  SET_PROFILE,
  CLEAR_PROFILE,
  SET_SCREAM,
  POST_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  EDIT_SCREAM,
  DELETE_SCREAM,
  CLEAR_SCREAM,
  SET_COMMENTS,
  SUBMIT_COMMENT
} from '../types';


const initialState = {
  profile: {
    user: {},
    screams: []
  },
  screams: [],
  scream: {},
  loading: false,
  nextHref: null,
  hasMoreItems: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: {
          user: action.payload.user,
          screams: action.payload.screams
        }
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: initialState.profile
      }
    case SET_SCREAMS:
      let screams = state.screams;
      action.payload.collection && 
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
      return {
        ...state,
        scream: {}
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
    case SET_COMMENTS:
      return {
        ...state,
        screams: state.screams.map(
          (scream) => scream.id === action.payload.screamId ? {
            ...scream,
            comments: action.payload.comments
          } : scream
        )
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        screams: state.screams.map(
          (scream) => scream.id === action.payload.screamId ? {
            ...scream,
            comments: [
              ...scream.comments,
              action.payload
            ]
          } : scream
        )
        /* scream: {
          ...state.scream,
          comments: [
            action.payload,
            ...state.scream.comments
          ]
        } */
      };
    case EDIT_SCREAM:
      let updatedScreams = state.screams.map(
        (scream) => scream.id === action.payload.screamId ? {
          ...scream,
          body: action.payload.text
        } : scream
      );
      return {
        ...state,
        screams: updatedScreams
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