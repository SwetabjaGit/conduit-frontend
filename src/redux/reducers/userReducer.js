import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        credentials: action.payload.credentials,
        likes: action.payload.likes,
        notifications: action.payload.notifications
      };
    default:
      return state;
  }
};