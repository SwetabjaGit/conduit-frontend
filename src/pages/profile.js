/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// MUI
//import Scream from '../components/Scream';
import ScreamItem from '../components/Scream/ScreamItem';
import StaticProfile from '../components/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { fetchProfile, clearProfile } from '../redux/actions/dataActions';


const Profile = (props) => {
  const { match, profile, loading } = props;
  //const [screamIdParam, setScreamIdParam] = useState(null);

  window.onpopstate = () => {
    props.clearProfile();
  };

  useEffect(() => {
    const handle = match.params.handle;
    const screamId = match.params.screamId;
    console.log({ handle, screamId });
    //if(screamId) setScreamIdParam(screamId);
    props.fetchProfile(handle);
  }, []);


  /* const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : profile.screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    profile.screams.map((scream) => (
      <ScreamItem 
        key={scream.screamId} 
        scream={scream} 
      />
    ))
  ) : (
    profile.screams.map((scream) => (
      scream.screamId !== screamIdParam ? (
        <ScreamItem
          key={scream.screamId}
          scream={scream}
        />
      ) : (
        <ScreamItem
          key={scream.screamId}
          scream={scream}
          openDialog
        />
      ))
    )
  ); */

  const screamsList = loading ? (
    <ScreamSkeleton />
  ) : (
    profile.screams.map((scream) => (
      <ScreamItem
        key={scream.screamId} 
        scream={scream} 
      />
    ))
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsList}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile.user === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile.user} />
        )}
      </Grid>
    </Grid>
  );

};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  fetchProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.data.profile,
  loading: state.UI.loading,
});

const mapActionsToProps = {
  fetchProfile,
  clearProfile
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Profile);