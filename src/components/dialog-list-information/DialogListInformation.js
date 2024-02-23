import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const DialogListInformation = (props) => {
    const { onClose, open , text, items } = props;
    const handleClose = () => {
      onClose();
    };
    
    return (
      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {text}
        </DialogTitle>
        <DialogContent>
          <ul>
            {(items || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
};
DialogListInformation.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default DialogListInformation;