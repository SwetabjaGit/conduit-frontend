import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import AttachFileIcon from '@material-ui/icons/AttachFile';

// Redux Stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    marginTop: 10,
    padding: 0
  },
  paper: {
    border: '1px solid #adadad',
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));


const CommentForm = (props) => {
  const { screamId, authenticated, credentials } = props;
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [comment, setComment] = useState({});
  const commentRef = useRef(null);


  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleChange = event => {
    event.persist();
    setComment({ body: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitComment(screamId, comment);
    setComment({});
    event.target.value = '';
    console.log({ comment });
  };

  const handleCommentSubmit = (event) => {
    if(event.keyCode === 13){
      props.submitComment(screamId, comment);
      setComment({});
      event.target.value = '';
      console.log({ comment });
    }
  };


  const commentFormMarkup = authenticated ? (
    <div className={classes.root}>
      <Avatar
        alt="Person"
        src={credentials.imageUrl}
      />{' '}
      <Paper
        className={classes.paper}
        elevation={0}
      >
        <Input
          ref={commentRef}
          onKeyUp={handleCommentSubmit}
          className={classes.input}
          disableUnderline
          onChange={handleChange}
          placeholder="Post a comment"
        />
      </Paper>
      <Tooltip title="Send">
        <IconButton 
          onClick={handleSubmit}
          color={comment.length > 0 ? 'primary' : 'default'}
        >
          <SendIcon />
        </IconButton>
      </Tooltip>
      <Divider className={classes.divider} />
      <Tooltip title="Attach image">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AddPhotoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Attach file">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      />
    </div>
  ) : null;

  return commentFormMarkup;
};


CommentForm.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  credentials: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials
});

const mapActionsToProps = {
  submitComment
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CommentForm);
 