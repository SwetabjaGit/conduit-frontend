import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux Stuff
import { connect } from 'react-redux';
import { submitComment } from '../redux/actions/dataActions';


const styles = (theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    marginRight: 3
  },
  button: {
    marginLeft: 3
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  }
});

const CommentForm = (props) => {

  const { authenticated, classes, screamId } = props;

  const [body, setBody] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if(!props.UI.errors){
      setErrors({});
      setBody({ body: '' });
    }
  }, [props.UI]);

  const handleChange = (event) => {
    setBody({ [event.target.name]: event.target.value });
    console.log(body);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitComment(screamId, body);
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form 
        onSubmit={handleSubmit} 
        className={classes.formContainer}
      >
        <TextField
          className={classes.textField}
          name="body"
          variant="outlined"
          type="text"
          value={body.body}
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}ß
          onChange={handleChange}
          fullWidth
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Grid>
  ) : null;

  return commentFormMarkup;

};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  submitComment
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));