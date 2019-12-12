import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI Stuffs 
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';



const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  logoutButton: {
    margin: 12
  },
  progress: {
    minWidth: 100,
    minHeight: 100,
    marginLeft: 150,
    marginTop: 150
  }
});


const Profile = (props) => {

  const {
    classes, 
    user: {
      credentials: { handle, createdAt, imageUrl, bio, website, location, email, userId },
      loading,
      authenticated
    }
  } = props;

  const handleLogout = () => {
    props.logoutUser();
    window.location.href = '/login';
  }

  let profileMarkup = !loading ? (authenticated ? (

    <Paper className={classes.paper}>
      <div className={classes.profile}>

        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />

        <div className="profile-details">
          <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
          </MuiLink>
          <hr />
          { bio && <Typography variant="body2">{bio}</Typography> }
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          <hr />
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleLogout} 
            className={classes.logoutButton}
          >
            Logout
          </Button>
        </div>
        
      </div>
    </Paper>

  ) : (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
        No profile found, please login again
      </Typography>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" component={Link} to="/login">
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/signup">
          Signup
        </Button>
      </div>
    </Paper>
  )) : (<CircularProgress className={classes.progress} color="secondary" />);

  return profileMarkup;
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));

