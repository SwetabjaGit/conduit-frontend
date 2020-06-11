import React, { useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import {
  SCREAMS_URL,
  SCREAMS_PAGE_SIZE
} from '../config/constants';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchScreams } from '../redux/actions/dataActions';
import InfiniteScroll from 'react-infinite-scroller';


const styles = (theme) => ({
  progress: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 30,
    zoom: 1.5
  }
});


const Home = (props) => {

  const {
    classes,
    screams,
    loading,
    fetchScreams,
    nextHref,
    hasMoreItems
  } = props;

  useEffect(() => {
    console.log(screams);
  }, [screams]);

  const fetchMoreData = () => {
    let screamsUrl = `${SCREAMS_URL}?page_size=${SCREAMS_PAGE_SIZE}`;
    if(nextHref){
      screamsUrl = nextHref;
    }
    fetchScreams(screamsUrl);
  };

  const loader = (
    <CircularProgress
      key={0}
      className={classes.progress} 
      color="secondary" 
      style={{ color: '#D41' }} 
    />
  );

  const fetchedScreams = loading ? (
    <ScreamSkeleton/>
  ) : (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchMoreData}
      hasMore={hasMoreItems}
      loader={screams.length === 0 ? <ScreamSkeleton key={0} /> : loader}
    >
      {screams.map(scream => (
        <Scream
          key={scream.id}
          scream={scream}
        />
      ))}
    </InfiniteScroll>
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
  loading: PropTypes.bool.isRequired,
  nextHref: PropTypes.string,
  hasMoreItems: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  screams: state.data.screams,
  loading: state.UI.loading,
  nextHref: state.data.nextHref,
  hasMoreItems: state.data.hasMoreItems
});

const mapActionsToProps = {
  fetchScreams,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Home));
