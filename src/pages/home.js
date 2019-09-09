import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Scream from '../components/Scream';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { fetchUserData } from '../redux/actions/userActions';
import { fetchScreams, setScreams } from '../redux/actions/dataActions';


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
    progress: {
        margin: theme.spacing(2),
    }
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
        //fetchScreamsUsingPromise(this.changeState);
        this.props.fetchScreams();
    }

    render() {

        const {
            classes,
            data: { fetching, screams }
        } = this.props;

        let recentScreamsMarkup = screams ? (
            screams.map(scream => 
                <Scream
                    key={ scream.screamId }
                    scream={ scream } 
                />
            )
        ) : (
            <p>Loading...</p>
        );

        let renderScreams = screams ? (
            screams.map(scream => 
                <Paper
                    key={ scream.screamId }
                    className={ classes.paper }>
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
            <div className={ classes.root }>
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
                                onClick={ this.props.fetchUserData } >
                                Get User Data
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
                <br />
                { fetching ? <CircularProgress className={classes.progress} color="secondary" /> : <span></span> }
            </div>
        )
    }

}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    fetchUserData: PropTypes.func.isRequired,
    fetchScreams: PropTypes.func.isRequired,
    setScreams: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
    //screams: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
    data: state.data
});

const mapActionsToProps = {
    fetchUserData,
    fetchScreams,
    setScreams
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Home));