import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import NavbarButton from '../util/NavbarButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Redux Stuff
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};


const DeleteScream = (props) => {

  const { classes, screamId } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteScream = () => {
    props.deleteScream(screamId);
    setOpen(false);
  };

  const deleteButton = (
    <NavbarButton
      tip="Delete Scream"
      onClick={handleOpen}
      btnClassName={classes.deleteButton}
    >
      <DeleteOutline color="secondary" />
    </NavbarButton>
  );

  return (
    <div>
      {deleteButton}
      <MenuItem onClick={handleOpen}>Delete</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete this scream?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapActionsToProps = {
  deleteScream
};

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeleteScream));
