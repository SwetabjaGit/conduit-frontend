import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NavbarButton from '../util/NavbarButton';

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <div>
              <NavbarButton tip="Post a scream">
                <AddIcon color="primary" />
              </NavbarButton>
              <Link to="/">
                <NavbarButton tip="Home">
                  <HomeIcon />
                </NavbarButton>
              </Link>
              <NavbarButton tip="Notifications">
                <NotificationsIcon color="primary" />
              </NavbarButton>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to='/login' >
                Login
              </Button>
              <Button color="inherit" component={Link} to='/'>
                Home
              </Button>
              <Button color="inherit" component={Link} to='/signup'>
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
