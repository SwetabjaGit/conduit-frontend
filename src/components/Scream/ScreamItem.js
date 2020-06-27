/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Components
import UpdateScream from './UpdateScream';
import DeleteScream from './DeleteScream';
import CommentBubble from '../Comment/CommentBubble';
import CommentForm from '../Comment/CommentForm';
import ScreamDialog from './Dialog/ScreamDialog';

// Redux
import { connect } from 'react-redux';
import { 
  likeScream, 
  unlikeScream,
  fetchCommentsByScreamId
} from '../../redux/actions/dataActions';



const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(2, 0, 1, 0),
    padding: theme.spacing(1)
  },
  media: {
    minWidth: 200,
    height: 200
  },
  actionArea: {
    maxWidth: 200,
    maxHeight: 200
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: 0
  },
  cardHeader: {
    padding: 5
  },
  cardText: {
    padding: 5,
    flexGrow: 1
  },
  cardActions: {
    padding: 0
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    padding: 0,
    maxWidth: 40,
    maxHeight: 40
  },
  comments: {
    margin: theme.spacing(2, 0),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: '#ccc'
  },
  commentsList: {
    //border: '1px solid black',
    height: '100px'
  },
  progress: {
    width: '100%',
    marginLeft: '45%',
    marginTop: 30,
  },
  cardContent: {
    marginBottom: -20
  }
}));


const ScreamItem = props => {
  const {
    scream,
    authenticated,
    credentials,
    userLikes,
    screamIdParam,
    isProfile
  } = props;

  dayjs.extend(relativeTime);
  let screamId = props.scream.id;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(scream.likeCount);
  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;

  
  useEffect(() => {
    let likeExists = userLikes && userLikes.find(
      (like) => like.screamId === screamId
    );
    setLiked(likeExists);
  }, [userLikes]);


  useEffect(() => {
    if(expanded === true) {
      console.log(`Fetching comments for ${screamId}, ${scream.comments}`);
      props.fetchCommentsByScreamId(screamId, isProfile);
    }
  }, [expanded]);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const likeScream = () => {
    setLiked(true);
    setLikes(likes => likes + 1);
    props.likeScream(screamId);
  };

  const unlikeScream = () => {
    setLiked(false);
    setLikes(likes => likes - 1);
    props.unlikeScream(screamId);
  };
    
  window.onmousedown = (event) => {
    handleMenuClose();
  };


  const ScreamMenu = (
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
      <UpdateScream screamId={screamId} scream={scream}/>
      <DeleteScream screamId={screamId}/>
    </Menu>
  );


  const likeButton = !authenticated ? (
    <Link to="/login">
      <IconButton
        className={classes.likeButton}
        size="small"
      >
        <FavoriteBorderIcon color="primary" />
      </IconButton>
    </Link>
  ) : liked ? (
    <Tooltip title="Unlike">
      <IconButton
        className={classes.likedButton}
        onClick={unlikeScream}
        size="small"
      >
        <FavoriteIcon color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Like">
      <IconButton
        className={classes.likeButton}
        onClick={likeScream}
        size="small"
      >
        <FavoriteBorderIcon color="primary" />
      </IconButton>
    </Tooltip>
  );

  const commentLoader = (
    <CircularProgress 
      className={classes.progress}
      color="secondary" 
    />
  );

  return (
    <Card className={classes.card}>
      <Link to={`/scream/${scream.id}`}>
        <ScreamDialog
          screamId={screamId}
          contentImage={scream.contentImage}
          userHandle={scream.userHandle}
          screamIdParam={screamIdParam}
          authenticated={authenticated}
          authenticatedUser={credentials.handle}
        />
      </Link>
      <div className={classes.content}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Link
              component={RouterLink}
              to={`/users/${scream.userHandle}`}
            >
              <Avatar 
                aria-label="recipe" 
                className={classes.avatar}
                src={scream.userImage} 
              />
            </Link>
          }
          action={
            authenticated && 
            scream.userHandle === credentials.handle && (
              <IconButton
                aria-label="settings"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
            )            
          }
          title={
            <Link
              style={{ marginRight: 15 }}
              color="textPrimary"
              component={RouterLink}
              to={`/users/${scream.userHandle}`}
              variant="body2"
            >
              {scream.userName}
            </Link>
          }
          subheader={dayjs(scream.createdAt).fromNow()}
        />
        <CardContent className={classes.cardText}>
          <Typography variant="body1" style={{fontWeight: 'bold', marginBottom: 4}}>
            {scream.userName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {scream.body}
          </Typography>
        </CardContent>
        <CardActions
         className={classes.cardActions}
         disableSpacing
        >
          {likeButton}
          <Typography
            color="textSecondary"
            variant="h6"
            style={{ marginRight: 10 }}
          >
            {likes}
          </Typography>
          <Tooltip title="Comment">
            <IconButton aria-label="add to favorites">
              <CommentIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <Typography paragraph>Comments:</Typography>
            <Divider className={classes.divider}/>
            {scream.comments ? (
              <div className={classes.comments}>
                {scream.comments.map(comment => (
                  <CommentBubble
                    key={comment.id}
                    comment={comment}
                    authenticated={authenticated}
                    authenticatedUser={credentials.handle}
                  />
                ))}
              </div>
            ) : commentLoader}
            <Divider className={classes.divider}/>
            <CommentForm screamId={scream.id}/>
          </CardContent>
        </Collapse>
      </div>
      {ScreamMenu}
    </Card>
  );
};


ScreamItem.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  credentials: PropTypes.object.isRequired,
  userLikes: PropTypes.array,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  scream: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials,
  userLikes: state.user.likes,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
  fetchCommentsByScreamId
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ScreamItem);
