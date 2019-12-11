import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI Stuff
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';


const Link = import('react-router-dom').Link;


const styles = {
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
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes, 
      scream : { 
        body, 
        createdAt, 
        userImage, 
        userHandle
      }
    } = this.props;
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
              <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography variant="body1">
                {body}
              </Typography>
            </CardContent>
        </Card>
      </div>
    )
  }
};

export default withStyles(styles)(Scream);
