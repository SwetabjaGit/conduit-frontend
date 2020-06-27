/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// MUI Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';

// Redux Stuff
import { connect } from 'react-redux';
import { editComment } from '../../redux/actions/dataActions';


const useStyles = makeStyles(theme => ({
  updateButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  },
  dialogContent: {
    minWidth: '100%',
    width: '100%',
    margin: 20
  },
  screamBody: {
    width: '90%',
  }
}));


const EditComment = (props) => {
  const { commentId, comment } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editedBody, setEditedBody] = useState({});
  

  useEffect(() => {
    setEditedBody({
      commentId,
      data: comment.body
    });
  }, [comment.body]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (event) => {
    setEditedBody({
      ...editedBody,
      data: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log(editedBody);
    props.editComment(editedBody);
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>Edit</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Update Comment Details
        </DialogTitle>
        <div className={classes.dialogContent}>
          <TextField
            className={classes.screamBody}
            id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax={4}
            value={editedBody.data}
            onChange={handleTextChange}
            variant="outlined"
          />
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};


EditComment.propTypes = {
  editComment: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  openEdit: state.UI.editDialogOpen
});

const mapActionsToProps = {
  editComment
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditComment);
