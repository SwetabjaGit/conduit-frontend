import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI Stuffs
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const styles = theme => ({
    card: { 
        flex: 1,
        margin: theme.spacing(2),
    },
    media: {
        height: 0,
        paddingTop: '26.25%', // 16:9
    }
});

const styles2 = theme => ({
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
        paddingTop: '25%',
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    }
});

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { 
            classes, 
            scream : {
                screamId, 
                body, 
                userHandle, 
                createdAt, 
                commentCount, 
                likeCount, 
                userImage 
            } 
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    image={userImage}
                    title="Users Avatar"
                />
                <CardContent
                    className={classes.content}>
                    <Typography 
                        gutterBottom 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${userHandle}`}
                        color="primary">
                            { userHandle }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        { /* dayjs(createdAt).fromNow() */ }
                        { createdAt }
                    </Typography>
                    <Typography variant="body1" component="p">
                        { body }
                    </Typography>
                </CardContent>
                <CardActions
                    disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        <Typography>{ likeCount }</Typography>
                    </IconButton>
                    <IconButton aria-label="share">
                        <CommentIcon />
                        <Typography>{ commentCount }</Typography>
                    </IconButton>
                    {/* <span style={{ flex: 1 }}></span>
                    <Button size="small" color="primary">
                        Like
                    </Button>
                    <Button size="small" color="primary">
                        Comment
                    </Button>
                    <Button size="small" color="primary">
                        Share
                    </Button> */}
                </CardActions>
            </Card>
        );
    }
}

Scream.propTypes = {
    classes: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired
}

export default withStyles(styles2)(Scream);
