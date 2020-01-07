import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NavbarButton from '../util/NavbarButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
/* import Comments from './Comments';
import CommentForm from './CommentForm'; */

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { getScream, clearErrors, clearScream } from '../redux/actions/dataActions';


const styles = (theme) => ({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200
  },
});


const ScreamDialog = (props) => {

  const { 
    classes,
    scream : {
      body,
      createdAt,
      likeCount,
      commentCount,
      userHandle,
      userImage,
      comments
    },
    UI : { loading }
  } = props;

  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  const [newPath, setNewPath] = useState('');


  const handleOpen = () => {
    setOpen(true);
    props.getScream(props.screamId);
  };

  const handleClose = () => {
    setOpen(false);
    props.clearScream();
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">
          {body}
        </Typography>
        <LikeButton screamId={props.screamId} />
        <span>{likeCount} likes</span>
        <NavbarButton tip="comments">
          <ChatIcon color="primary" />
        </NavbarButton>
        <span>{commentCount} comments</span>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <CardMedia
        onClick={handleOpen}
        className={classes.image}
        image={props.userImage}
        title="Profile image"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <NavbarButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </NavbarButton>
        <DialogTitle>Here are all the Scream Details</DialogTitle>
        <DialogContent className={classes.dialogContent} >
          { dialogMarkup }
        </DialogContent>
      </Dialog>
    </div>
  )
};

ScreamDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  clearScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = {
  getScream,
  clearErrors,
  clearScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
