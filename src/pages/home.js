import React, { useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
//import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchScreams } from '../redux/actions/dataActions';


const styles = (theme) => ({
  progress: {
    position: 'absolute',
    top: '40%',
    left: '30%'
  }
});


const Home = (props) => {

  const { screams, fetchScreams } = props;

  useEffect(() => {
    fetchScreams();
  }, [fetchScreams]);

  const fetchedScreams = screams ? (
    screams.map(scream => <Scream key={scream.id} scream={scream} />)
  ) : (
    <ScreamSkeleton />
  );

  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {fetchedScreams}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );

};


Home.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchScreams: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
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
