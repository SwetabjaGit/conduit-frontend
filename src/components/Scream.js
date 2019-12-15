import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavbarButton from '../util/NavbarButton';
import DeleteScream from './DeleteScream';

//MUI Stuff
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';



const styles = (theme) => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
});

class Scream extends Component {

  alreadyLikedScream = () => {
    if(
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    )
      return true;
    else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

  render() {

    const {
      classes, 
      scream: {
        body, createdAt, userImage, userHandle, screamId, likeCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
  
    dayjs.extend(relativeTime);

    const likeButton = !authenticated ? (
      <NavbarButton tip="Like" >
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </NavbarButton>
    ) : (
      this.alreadyLikedScream() ? (
        <NavbarButton tip="Unlike" onClick={this.unlikeScream} >
          <FavoriteIcon color="primary" />
        </NavbarButton>
      ) : (
        <NavbarButton tip="Like" onClick={this.likeScream} >
          <FavoriteBorder color="primary" />
        </NavbarButton>
      )
    );

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.image}
            image={userImage}
            title="Profile image"
          />
          <CardContent className={classes.content}>
            <Typography 
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">
              {body}
            </Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <NavbarButton tip="Comments">
              <ChatIcon color="primary" />
            </NavbarButton>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  scream: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
