import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Scream from '../components/Scream';
import Button from '@material-ui/core/Button';

const papersList = [
    {
        id: 1,
        value: 'first',
    },
    {
        id: 2,
        value: 'second',
    },
    {
        id: 3,
        value: 'third',
    },
    {
        id: 4,
        value: 'fourth',
    },
    {
        id: 5,
        value: 'fifth',
    },
    {
        id: 6,
        value: 'sixth',
    },
    {
        id: 7,
        value: 'seventh',
    },
    {
        id: 8,
        value: 'eighth',
    }
];

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    button: {
        margin: theme.spacing(1),
    },
});

const methods = {
    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                const persons = res.data;
                console.log(persons);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

const fetchScreamsUsingAsyncAwait = async () => {
    const res = await axios.get('/screams');
    console.log('Using Async Await');
    console.log(res.data);
}

const fetchScreamsUsingPromise = (callback) => {
    console.log('Using Promise');
    axios.get('/screams')
        .then(res => {
            console.log('Res.Data', res.data);
            let currentState = callback(res);
            console.log('StateStatus', currentState);
        })
        .catch(err => {
            console.error(err);
        });
}

const fetchUserData = async () => {
    console.log('fetchUserData');
    const FBIdToken = await localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    console.log('Working', FBIdToken);
    axios.get('/user')
        .then((res) => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
}

class Home extends Component {

    state = {
        screams: []
    }

    changeState = (response) => {
        this.setState({
            screams: response.data
        });
        return this.state
    }

    componentDidMount(){
        fetchScreamsUsingPromise(this.changeState);
    }

    render() {

        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => 
                <Scream
                    key={ scream.screamId }
                    scream={ scream } 
                />
            )
        ) : (
            <p>Loading...</p>
        );

        let renderScreams = this.state.screams ? (
            this.state.screams.map(scream => 
                <Paper
                    key={ scream.screamId }
                    className={ this.props.classes.paper }>
                    <Typography variant="h5" component="h3">
                        { scream.body }
                    </Typography>
                    <Typography component="p">
                        { scream.screamId }
                    </Typography>
                    <Typography component="p">
                        { scream.userHandle }
                    </Typography>
                    <Typography component="p">
                        { scream.createdAt._seconds }
                    </Typography>
                    <Typography component="p">
                        { scream.createdAt._nanoseconds }
                    </Typography>
                </Paper>
            )
        ) : (
            <p>Loading...</p>
        );

        return (
            <div className={ this.props.classes.root }>
                <Grid container>
                    <Grid item sm={8} xs={12}>
                        { recentScreamsMarkup }
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Paper className={ this.props.classes.paper }>
                            <Typography variant="h5" component="h3">
                                Profile Section
                            </Typography>
                            <Typography component="p">
                                This is avatar
                            </Typography>
                            <Typography component="p">
                                Profile info 1
                            </Typography>     
                            <Typography component="p">
                                Profile info 2
                            </Typography>     
                            <Typography component="p">
                                Profile info 3
                            </Typography>     
                            <Typography component="p">
                                Profile info 4
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={this.props.classes.button} 
                                onClick={ fetchUserData } >
                                Get User Data
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

Home.propTypes = {
    classes: PropTypes.object.isRequired
    //screams: PropTypes.object.isRequired
}

export default withStyles(styles)(Home);


/* const Home = props => {
    const { classes } = props;
    const papersList = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
    
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item sm={8} xs={12}>
                    { papersList.map(data => 
                        <Paper className={classes.paper}>
                            <Typography variant="h5" component="h3">
                                This is a sheet of paper.
                            </Typography>
                            <Typography component="p">
                                This is { data } item.
                            </Typography>
                        </Paper>
                    )}
                </Grid>
                <Grid item sm={4} xs={12} >
                    <Paper className={classes.paper}>
                        <Typography variant="h5" component="h3">
                            Profile Section
                        </Typography>
                        <Typography component="p">
                            This is avatar.
                        </Typography>
                        <Typography component="p">
                            This section contains profile info 1.
                        </Typography>
                        <Typography component="p">
                            This section contains profile info 2.
                        </Typography>
                        <Typography component="p">
                            This section contains profile info 3.
                        </Typography>
                        <Typography component="p">
                            This section contains profile info 4.
                        </Typography>
                        <Typography component="p">
                            This section contains profile info 5.
                        </Typography>             
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
const funcs = {
    expDef1() {
        withStyles(styles)(Home);
    },
    expDef2() {
        lifecycle(methods)(Home);
    }
}
export default funcs; */