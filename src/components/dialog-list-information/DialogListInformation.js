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
          Sabias que?
        </DialogTitle>
        <DialogContent>
          <ul>
            {items.map((item, index) => (
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