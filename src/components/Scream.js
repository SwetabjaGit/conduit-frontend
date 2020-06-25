import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import ChatIcon from '@material-ui/icons/Chat';

// Components
import NavbarButton from '../util/NavbarButton';
import DeleteScream from './Scream/DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton'

// Redux
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
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
}));


const Scream = (props) => {

  const { 
    scream,
    authenticated,
    credentials
  } = props;
  let screamId = props.scream.id;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  dayjs.extend(relativeTime);


  const deleteButton = authenticated && scream.userHandle === credentials.handle ? (
    <DeleteScream screamId={screamId} />
  ) : null;

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea className={classes.actionArea}>
          <ScreamDialog 
            screamId={screamId}
            userImage={scream.userImage}
            userHandle={scream.userHandle}
            openDialog={openDialog}
          />
        </CardActionArea>
        <CardContent className={classes.content}>
          <Typography 
            variant="h5"
            component={Link}
            to={`/users/${scream.userHandle}`}
            color="primary"
          >
            {scream.userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(scream.createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">
            {scream.body}
          </Typography>
          {/*  { likeButton } */}
          <LikeButton screamId={screamId} />
          <span>{scream.likeCount} Likes</span>
          <NavbarButton tip="Comments">
            <ChatIcon color="primary" />
          </NavbarButton>
        </CardContent>
      </Card>
    </div>
  );
};


Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  credentials: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials,
});

const mapActionsToProps = {
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Scream);
