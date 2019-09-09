import {
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    SET_SCREAMS,
    SET_SCREAM,
    POST_SCREAM,
    DELETE_SCREAM,
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_DATA,
    SUBMIT_COMMENT,
    SET_ERRORS,
    CLEAR_ERRORS
} from '../types';
import axios from 'axios';


export const fetchScreams = () => (dispatch) => {
    console.log('Fetching Screams Using Actions');
    dispatch({ type: LOADING_DATA });
    console.log('Fetching', true);
    axios.get('/screams')
        .then((res) => {
            console.log('Screams:', res.data);
            dispatch(setScreams(res.data));
            dispatch(clearErrors());
            dispatch({ type: STOP_LOADING_UI });
            console.log('Fetching', false);
        })
        .catch((err) => {
            console.log(err);
            dispatch(setErrors(err.response.data));
            dispatch({ type: STOP_LOADING_UI });
            console.log('Fetching', false);
        });
};

export const setScreams = (data) => (dispatch) => {
    console.log('Setting Screams using Actions');
    dispatch({
        type: SET_SCREAMS,
        payload: data
    });
};

export const fetchScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/scream/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            console.log('Single Scream:', res.data);
            dispatch(clearErrors());
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => {
            console.log(err);
            dispatch(setErrors(err.response.data));
            dispatch({ type: STOP_LOADING_UI });
        });
};

export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch(clearErrors());
            //dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => {
            console.log(err);
            dispatch(setErrors(err.response.data));
            //dispatch({ type: STOP_LOADING_UI });
        });
};

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/screams/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export const likeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data            //Returns the scream object which is liked
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data           //Returns the scream object which is liked
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data              //Returns screamData Object as described below
            });
            console.log('Comment Object', res.data);
            dispatch(clearErrors());
        })
        .catch((err) => {
            console.log(err);
            dispatch(setErrors(err.response.data));
        });
};

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: SET_SCREAMS,
                payload: null
            });
        })
};

export const setErrors = (errMessage) => (dispatch) => {
    dispatch({
        type: SET_ERRORS,
        payload: errMessage
    })
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

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
















