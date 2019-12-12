import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchScreams } from '../redux/actions/dataActions';
import { logoutUser } from '../redux/actions/userActions';

// Components
import Scream from '../components/Scream';

const styles = (theme) => ({
  progress: {
    minWidth: 200,
    minHeight: 200,
    marginLeft: 400,
    marginTop: 300
  }
});


class Home extends Component {

  componentDidMount(){
    this.props.fetchScreams();
  }

  render() {

    const { classes, authenticated, screams, loading } = this.props;

    const deauthenticateUser = () => {
      if (authenticated === true) {
        this.props.logoutUser();
        window.location.href = '/login';
      } else {
        console.log('User not authenticated');
      }
    };

    const fetchedScreams = screams ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : <CircularProgress className={classes.progress} color="secondary" />;

    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {fetchedScreams}
          {loading ? <CircularProgress className={classes.progress} color="secondary" /> : <span></span>}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Button variant="contained" color="secondary" onClick={deauthenticateUser} >
            Logout
          </Button>
        </Grid>
      </Grid>
    );

  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchScreams: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  screams: state.data.screams,
  loading: state.data.loading
});

const mapActionsToProps = {
  fetchScreams,
  logoutUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Home));
