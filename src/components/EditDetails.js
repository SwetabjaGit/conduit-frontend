import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuffs
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// Redux Stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// Icons
import NavbarButton from '../util/NavbarButton';
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
  button: {
    margin: 5
  },
  textField: {
  }
});

const EditDetails = (props) => {

  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ bio: '', website: '', location: '' });

  useEffect(() => {
    setOldUserDetails(props.credentials);
  }, [props.credentials]);
  
  const setOldUserDetails = (credentials) => {
    setUserDetails({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    props.editUserDetails(userDetails);
    handleClose();
  };

  return (
    <div>
      <NavbarButton 
        tip="Edit Details" 
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="secondary" fontSize="large" />
      </NavbarButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Edit Profile Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={userDetails.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={userDetails.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={userDetails.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

const mapActionsToProps = {
  editUserDetails
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditDetails));
