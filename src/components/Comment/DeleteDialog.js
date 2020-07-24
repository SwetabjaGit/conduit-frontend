import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';

// Redux Stuff
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/dataActions';


const DeleteDialog = (props) => {
  const { commentId } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteScream = () => {
    props.deleteComment(commentId);
    setOpen(false);
  };


  return (
    <div>
      <MenuItem onClick={handleOpen}>Delete</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete this comment?
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

DeleteDialog.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  openDelete: state.UI.deleteDialogOpen
});

const mapActionsToProps = {
  deleteComment
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteDialog);
