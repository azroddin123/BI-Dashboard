import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteDialog = ({
  variant,
  name,
  description,
  handleClose,
  deleteHandler = () => {
    ("99");
  },
}) => (
  <>
    <DialogTitle id="alert-dialog-title">
      Are you sure to delete {variant.slice(0, -1)} ({name})?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => deleteHandler()}>Sure</Button>
      <Button onClick={handleClose} autoFocus>
        DISCARD
      </Button>
    </DialogActions>
  </>
);

export default DeleteDialog;
