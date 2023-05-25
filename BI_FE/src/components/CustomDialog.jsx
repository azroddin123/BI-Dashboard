import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CustomButton from './formUI/CustomButton';

export default function CustomDialog({onClose = () => {},buttonTitle = '',buttonProps = {},children}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose()
  };

  return (
    <div>
      <CustomButton variant="outlined" onClick={e => {
        e.stopPropagation()
        handleClickOpen()}} {...buttonProps}>
        {buttonTitle}
      </CustomButton>
      <Dialog
        open={open}
        onClose={e => {
            // e.stopPropagation()
            e.preventDefault()
            handleClose()}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
            {children}
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
            See Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}