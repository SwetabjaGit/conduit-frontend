import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

// Import the reducers
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer';


const rootReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;

