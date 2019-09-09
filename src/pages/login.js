import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from '../util/AuthTheme';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser, getUserData } from '../redux/actions/userActions';


const styles = theme.AuthTheme;

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { 
            classes,
            UI: { loading }
        } = this.props;
        //const { classes } = this.props;
        const { errors } = this.state;
        
        return (
            <Grid container className={ classes.form }>
                <Grid item sm />
                <Grid item sm >
                    <img src={AppIcon} alt="monkey" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
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
                            className={classes.button}
                        >
                            Login
                        </Button>
                        <br />
                        <small >
                            Dont have and account ? Signup 
                            <Link to="/signup"> here</Link>
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

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser,
    getUserData
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Login));