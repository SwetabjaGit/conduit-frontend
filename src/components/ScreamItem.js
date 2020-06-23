/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { red } from '@material-ui/core/colors';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Components
import EditScream from './UpdateScream';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';



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
}));

const ScreamItem = props => {
  const { 
    scream,
    authenticated,
    credentials,
    userLikes
  } = props;

  dayjs.extend(relativeTime);
  let screamId = props.scream.id;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(scream.likeCount);
  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;
  
  useEffect(() => {
    let likeExists = userLikes && userLikes.find(
      (like) => like.screamId === screamId
    );
    //console.log({ likeExists });
    setLiked(likeExists);
  }, [userLikes]);


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
  }

  const screamMenu = (
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
      <EditScream screamId={screamId} scream={scream} />
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


  return (
    <Card className={classes.card}>
      <Link 
        to={`/scream/${scream.id}`}
      >
        <CardActionArea 
          className={classes.actionArea}
        >
          <CardMedia
            component="img"
            alt="ContentImage"
            className={classes.media}
            image={scream.contentImage}
            title="ContentImage"
          >
          </CardMedia>
        </CardActionArea>
      </Link>
      <div className={classes.content}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Link to={`/profile/${scream.userHandle}/myfeed`}>
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
          title={scream.userHandle}
          subheader={dayjs(scream.createdAt).fromNow()}
        />
        <CardContent className={classes.cardText}>
          <Typography variant="h6" style={{fontWeight: 'bold', marginBottom: 4}}>
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
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
              pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
              medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
              again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </div>
      {screamMenu}
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
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ScreamItem);
