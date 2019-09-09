import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    UNLOADING_UI,
    SET_USER
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
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: UNLOADING_UI });
            console.log('Loading', false);
            history.push('/');
        })
        .catch((err) => {
            console.log(err.data);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            dispatch({ type: UNLOADING_UI });
            console.log('Loading', false);
        });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    console.log('Signing up using Actions');
    dispatch({ type: LOADING_UI });
    console.log('Loading', true);
    axios.post('/signup', newUserData)
        .then((res) => {
            console.log('User Data', res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: UNLOADING_UI });
            console.log('Loading', false);
            history.push('/');
        })
        .catch((err) => {
            console.log(err.data);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            dispatch({ type: UNLOADING_UI });
            console.log('Loading', false);
        });
}

export const getUserData = () => (dispatch) => {
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
}

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

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    console.log(FBIdToken);
}