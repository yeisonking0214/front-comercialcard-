import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getAllCatsServices} from './../../services/comucationService'


const emails = ['username@gmail.com', 'user02@gmail.com'];
const DialogListInformation = (props) => 
{
    const [items, setItems] = useState([])
    const { onClose, open } = props;
    const handleClose = () => {
      onClose();
    };
    useEffect(() => {
        const getAllCats = async () => {
          try {
            const { data } = await getAllCatsServices();
            console.log('data ::::::::::::::::', data);
            setItems(data);
          } catch (error) {
            console.log(error);
          }
        };
        getAllCats();
      }, []);
    return (
      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
};
DialogListInformation.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
export default DialogListInformation;