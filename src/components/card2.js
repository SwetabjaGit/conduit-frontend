import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IMG from '../MZ.png';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));

export default function MediaCard2() {
    const classes = useStyles();
    return (
        <Card className={classes.card}> 
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={IMG}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Zukerberg
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}


