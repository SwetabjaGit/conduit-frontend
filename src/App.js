import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import Navbar from './components/Navbar';
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';



const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://us-central1-socialape-d8699.cloudfunctions.net/api';


const token = localStorage.FBIdToken;
let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
};


const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
                <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
