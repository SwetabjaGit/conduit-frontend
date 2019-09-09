import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Components
import Navbar from './components/Navbar';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import navbar from './components/NavbarCustom';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west1-socialape-d081e.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
let authenticated;
if(token){
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    //If token has expired then logout the user and redirect to home page
    if(decodedToken.exp * 1000 < Date.now()){
        window.location.href = '/login';
        authenticated = false;
    }else{
        authenticated = true;
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route 
                                    exact 
                                    path="/navbar" 
                                    component={navbar} />
                                <Route 
                                    exact 
                                    path="/" 
                                    component={home} />
                                <AuthRoute 
                                    exact 
                                    path="/signup" 
                                    component={signup} 
                                    authenticated={authenticated}
                                />
                                <AuthRoute 
                                    exact 
                                    path="/login" 
                                    component={login} 
                                    authenticated={authenticated} 
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
 
export default App;
