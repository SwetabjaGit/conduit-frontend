import { 
    FETCHING_SCREAMS,
    SET_SCREAMS,
    FETCHED_SCREAMS,
    SET_ERRORS,
    CLEAR_ERRORS
} from '../types';
import axios from 'axios';


export const fetchScreams = () => (dispatch) => {
    console.log('Fetching Screams Using Actions');
    dispatch({ type: FETCHING_SCREAMS });
    console.log('Fetching', true);
    axios.get('/screams')
        .then((res) => {
            console.log('Screams:', res.data);
            dispatch(setScreams(res.data));
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: FETCHED_SCREAMS });
            console.log('Fetching', false);
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            dispatch({ type: FETCHED_SCREAMS });
            console.log('Fetching', false);
        });
}

export const setScreams = (data) => (dispatch) => {
    console.log('Setting Screams using Actions');
    dispatch({
        type: SET_SCREAMS,
        payload: data
    });
}