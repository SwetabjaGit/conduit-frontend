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
  SET_PROFILE_COMMENTS,
  SUBMIT_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../types';
import { isEmpty } from '../../util/objectUtils';


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
          action.payload,
          ...state.screams
        ]
      };
    case EDIT_SCREAM:
      return {
        ...state,
        screams: state.screams.map(
          (scream) => scream.id === action.payload.screamId ? {
            ...scream,
            body: action.payload.data
          } : scream
        )
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.id !== action.payload
        )
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => action.payload.screamId === scream.id
      );
      state.screams[index] = action.payload;
      if (state.scream.id === action.payload.screamId) {
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
    case SET_PROFILE_COMMENTS:
      return {
        ...state,
        profile: {
          ...state.profile,
          screams: state.profile.screams.map(
            (scream) => scream.id === action.payload.screamId ? {
              ...scream,
              comments: action.payload.comments
            } : scream
          )
        }
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
        ),
        scream: !isEmpty(state.scream) ? {
          ...state.scream,
          comments: [
            action.payload,
            ...state.scream.comments
          ]
        } : state.scream
      };
    case EDIT_COMMENT:
      return {
        ...state,
        screams: state.screams.map(
          (scream) => {
            if(scream.id === action.payload.screamId) {
              scream.comments.map(
                (comment) => comment.id === action.payload.commentId ? {
                  ...comment,
                  body: action.payload.data
                } : comment
              )
            }
            return scream;
          }
        )
      };
    case DELETE_COMMENT:
      return {
        ...state,
        screams: state.screams.map(
          (scream) => {
            if(scream.id === action.payload.screamId) {
              scream.comments.filter(
                (comment) => comment.id !== action.payload.commentId
              )
            }
            return scream;
          }
        )
      };
    default:
      return state;
  }
};