import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import NavbarButton from '../../../util/NavbarButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentFormOld';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { 
  getScream,
  clearScream,
  clearErrors
} from '../../../redux/actions/dataActions';


const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxWidth: 200,
    maxHeight: 200,
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
  actionArea: {
    maxWidth: 200,
    maxHeight: 200
  },
  media: {
    minWidth: 200,
    height: 200
  },
}));


const ScreamDialog = (props) => {
  const {
    scream,
    loading,
    screamId,
    userImage,
    userHandle,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  //const [newPath, setNewPath] = useState('');


  useEffect(() => {
    scream === null && console.log('Fetching Scream.');
    console.log({ scream });
  }, [scream]);

  const handleOpen = () => {
    setOpen(true);
    console.log('Handle Open Called');
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    if(oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    setOldPath(oldPath);
    props.getScream(screamId);
  };

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    props.clearScream();
  };

  window.onpopstate = () => {
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
          {scream.userName}
        </Typography>
        <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(scream.createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">
          {scream.body}
        </Typography>
        <LikeButton screamId={screamId} />
        <span>{scream.likeCount} likes</span>
        <NavbarButton tip="comments">
          <ChatIcon color="primary" />
        </NavbarButton>
        <span>{scream.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={scream.comments} />
    </Grid>
  );

  return (
    <div>
      <CardActionArea 
        onClick={handleOpen} 
        className={classes.actionArea}
      >
        <CardMedia
          component="img"
          alt="ContentImage"
          
          className={classes.media}
          image={scream.contentImage}
          title="ContentImage"
        />
      </CardActionArea>
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
        <DialogTitle>Scream Details of @{userHandle}</DialogTitle>
        <DialogContent className={classes.dialogContent} >
          {scream && dialogMarkup}
        </DialogContent>
      </Dialog>
    </div>
  )
};

ScreamDialog.propTypes = {
  loading: PropTypes.bool.isRequired,
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  clearScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  //scream: state.data.scream,
  loading: state.UI.loading
});

const mapActionsToProps = {
  getScream,
  clearErrors,
  clearScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ScreamDialog);
