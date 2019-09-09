import {
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    SET_SCREAMS,
    SET_SCREAM,
    POST_SCREAM,
    DELETE_SCREAM,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false,
};

//Structure of 'scream' object
/* screamData = {
	screamId: 'YlQdC8O3vfJHvwaReqMk',
	body: "Second Scream",
	commentCount: 0,
	createdAt: "2019-03-15T10:59:52.798Z",
	likeCount: 0,
	userHandle: "stabja14",
	userImage: "https:omofake_dp_1.png?alt=media&token=dd67fc7b-3ebb-4578-aaab-df49dbcda8f4",
	comments: [
		{
			body: "How are you man!",
			createdAt: "2019-09-06T12:59:52.798Z",
			screamId: "YlQdC8O3vfJHvwaReqMk",
			userHandle: "stabja14"
		},
		{
			body: "I'm fine. How about u ?",
			createdAt: "2019-09-06T12:59:52.798Z",
			screamId: "YlQdC8O3vfJHvwaReqMk",
			userHandle: "stabja14"
		}
	]
} */

export default (state = initialState, action) => {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            };
        case POST_SCREAM:
            return {
                ...state,
                screams: [action.payload, ...state.screams]
            };
        case DELETE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index, 1);
            return {
                ...state
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
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
                    comments: [action.payload, ...state.scream.comments]
                }
            };
        default:
            return state;
    }
}