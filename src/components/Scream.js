import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//MUI Stuff
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import ChatIcon from '@material-ui/icons/Chat';

// Components
import NavbarButton from '../util/NavbarButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton'

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
  },
  actionArea: {
    maxWidth: 200,
    maxHeight: 200
  }
});

class Scream extends Component {

  alreadyLikedScream = () => {
    if(
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.id
      )
    )
      return true;
    else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.id);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.id);
  };

  render() {

    const {
      classes, 
      scream: {
        body,
        userHandle,
        userImage,
        contentImage,
        likeCount,
        commentCount,
        tagList,
        createdAt,
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    let screamId = this.props.scream.id;
  
    dayjs.extend(relativeTime);


    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
    
    return (
      <div>
        <Card className={classes.card}>
          <CardActionArea className={classes.actionArea}>
            <ScreamDialog 
              screamId={screamId}
              userImage={userImage}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
          </CardActionArea>
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
            {/*  { likeButton } */}
            <LikeButton screamId={this.props.scream.id} />
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
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
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
