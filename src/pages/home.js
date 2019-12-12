import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchScreams } from '../redux/actions/dataActions';

// Components
import Scream from '../components/Scream';
import Profile from '../components/Profile';


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

    const { classes, screams, loading } = this.props;

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
          <Profile />
        </Grid>
      </Grid>
    );

  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchScreams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  screams: state.data.screams,
  loading: state.data.loading
});

const mapActionsToProps = {
  fetchScreams,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Home));
