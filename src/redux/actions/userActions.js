import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from '../types';
import axios from 'axios';


export const loginUser = (loginData, history) => (dispatch) => {
    console.log('Logging in using Actions');
    dispatch({ type: LOADING_UI });
    console.log('Loading', true);
    axios.post('/login', loginData)
        .then((res) => {
            console.log('User Data', res.data);
            setAuthorizationHeader(res.data.token);  //Store the token in LocalStorage
            dispatch(getUserData());                 //Get the details of user and save it in browser
            dispatch(clearErrors());
            dispatch({ type: STOP_LOADING_UI });
            console.log('Loading', false);
            history.push('/');
        })
        .catch((err) => {
            console.log(err.data);
            dispatch(setErrors(err.response.data));
            dispatch({ type: STOP_LOADING_UI });
            console.log('Loading', false);
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    console.log('Signing up using Actions');
    dispatch({ type: LOADING_UI });
    console.log('Loading', true);
    axios.post('/signup', newUserData)
        .then((res) => {
            console.log('User Data', res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch(clearErrors());
            dispatch({ type: STOP_LOADING_UI });
            console.log('Loading', false);
            history.push('/');
        })
        .catch((err) => {
            console.log(err.data);
            dispatch(setErrors(err.response.data));
            dispatch({ type: STOP_LOADING_UI });
            console.log('Loading', false);
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then((res) => {
            console.log('Setting User Data Using Actions', res.data);
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const fetchUserData = () => (dispatch) => {
    const FBIdToken = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    console.log('Fetching User Data Using Actions', FBIdToken);
    axios.get('/user')
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    dispatch({ type: MARK_NOTIFICATIONS_READ });
    axios.post('/notifications', notificationIds)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            });
        })
        .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    console.log(FBIdToken);
};

export const setErrors = (errMessage) => (dispatch) => {
    dispatch({
        type: SET_ERRORS,
        payload: errMessage
    });
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}