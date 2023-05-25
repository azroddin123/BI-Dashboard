import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";
import { useContext } from "react";
import UserAndRolesContext from "../../context/UserAndRolesContext";
// import { baseUrl } from "../utils/urls.js";
// import { GlobalContext } from "../../cotext/GlobalContext";
const CustomDialog = ({
  children,
  Modal,
  sx = {},
  deleteDialog = false,
  variant = "",
  name = "",
  description,
  data = null,
  url,
  id,
}) => {
  // const { setUser } = React.useContext(GlobalContext);
  React.useEffect(() => {
    if (data) {
      // setUser(data);
    }
  }, [data]);
  // const { fetchRoleList, fetchUserList } = React.useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { users } = useContext(UserAndRolesContext);

  const {deleteReq : {_delete, isLoading}} = users
  const deleteHandler = (data) => _delete({id})
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        {!Array.isArray(children) ? children : null}
        {Array.isArray(children) ? children[0] : null}
      </span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {deleteDialog ? (
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
              <Button onClick={() => deleteHandler(data)} variant = "contained" disabled = {isLoading}>Sure</Button>
              <Button onClick={handleClose} autoFocus>
                DISCARD
              </Button>
            </DialogActions>
          </>
        ) : Modal ? (
          <>
            <Modal
              modal
              sx={{ ...sx, boxShadow: "none !important" }}
              defaultData={data}
              handleClose={handleClose}
            />
            <DialogActions>
              <Button
                autoFocus
                onClick={handleClose}
                sx={{ textAlign: "center", margin: "auto" }}
              >
                Discard
              </Button>
            </DialogActions>
          </>
        ) : (
          children[1]
        )}
      </Dialog>
    </div>
  );
};

export default CustomDialog;
