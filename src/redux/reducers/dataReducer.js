import {
    FETCHING_SCREAMS, 
    SET_SCREAMS,
    FETCHED_SCREAMS
} from '../types'

const initialState = {
    fetching: false,
    screams: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case FETCHING_SCREAMS:
            return {
                ...state,
                fetching: true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload
            };
        case FETCHED_SCREAMS:
            return {
                ...state,
                fetching: false
            }
        default:
            return state;
    }
}
