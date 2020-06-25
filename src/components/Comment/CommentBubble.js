import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import makeStyles from '@material-ui/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

import EditComment from './EditComment';
import DeleteComment from './DeleteComment';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  commentAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  bubble: {
    padding: theme.spacing(0.5, 1.5),
    marginLeft: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  time: {
    marginLeft: 'auto'
  },
  message: {
    margin: 0,
    padding: 0
  }
}));

const CommentBubble = props => {
  const { comment, className, ...rest } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const ITEM_HEIGHT = 48;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  window.onmousedown = (event) => {
    handleMenuClose();
  };

  const CommentMenu = (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuOpen}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: '15ch',
        },
      }}
    >
      <EditComment commentId={comment.id} comment={comment}/>
      <DeleteComment commentId={comment.id}/>
    </Menu>
  );

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        className={classes.commentAvatar}
        alt="Person"
        component={RouterLink}
        src={comment.imageUrl}
        to={`/users/${comment.userHandle}`}
      />
      <div className={classes.bubble}>
        <div className={classes.header}>
          <Link
            style={{ marginRight: 15 }}
            color="textPrimary"
            component={RouterLink}
            to={`/users/${comment.userHandle}`}
            variant="body2"
          >
            {comment.userName}
          </Link>
          <Typography
            className={classes.time}
            variant="body2"
          >
            {moment(comment.createdAt).fromNow()}
          </Typography>
        </div>
        <Typography
          className={classes.message}
          variant="body2"
          gutterBottom
        >
          {comment.body}
        </Typography>
      </div>
      <IconButton
        aria-label="settings"
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      {CommentMenu}
    </div>
  );
};

CommentBubble.propTypes = {
  className: PropTypes.string,
  comment: PropTypes.object.isRequired
};

export default CommentBubble;
