import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    button: {
        margin: 30
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        margin: theme.spacing(2),
    }
});

/* const styles = theme => ({
    ...theme
}); */

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    componentWillReceiveProps(){

    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle 
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data);
                //Store the token in browser localstorage so that we can use it later
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                }); 
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err.data);
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };x

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={ classes.form }>
                <Grid item sm />
                <Grid item sm >
                    <img src={AppIcon} alt="monkey" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={ this.handleSubmit }>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="email"
                            margin="normal"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            autoComplete="current-password"
                            margin="normal"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            autoComplete="current-password"
                            margin="normal"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle"
                            autoComplete="current-password"
                            margin="normal"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            id="sbchjds"
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button} >
                            Signup
                        </Button>
                        <br />
                        <small >
                            Already have an account ? Login
                            <Link to="/login"> here</Link>
                        </small>
                        <br />
                        { loading ? <CircularProgress className={classes.progress} color="secondary" /> : <span></span> }
                        { /* this.state.loading && <CircularProgress className={classes.progress} color="secondary" /> */ }
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);

