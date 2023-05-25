import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomDialog from "../../formUI/CustomDialog";
import CustomDeleteDialog from "../../formUI/CustomDeleteDialog";
import { useEffect } from "react";
import { useContext } from "react";
// import { GlobalContext } from "../../../cotext/GlobalContext";

const ActionPanel = ({
  url = null,
  id = null,
  modal = {},
  name = "",
  data = null,
  noDelete = false,
}) => {
  const editHandler = () => {};
  // const { setUser } = useContext(GlobalContext);
  // useEffect(() => {
  //   if (data) {
  //     console.log("data present");
  //     setUser(data);
  //   } else {
  //     console.log("not ptresent");
  //   }
  // }, [data]);
  return (
    <Stack direction="row" spacing={2}>
      <CustomDialog
        data={data}
        Modal={modal}
        sx={{ padding: "2.5rem 1.5rem 0.5rem  2.5rem" }}
        id={id}
        url={url}
      >
        <IconButton
          onClick={editHandler}
          children={<VisibilityIcon color="primary" />}
        />
      </CustomDialog>
      {!noDelete ? (
        <CustomDeleteDialog url={url} name={name} id={id}>
          <IconButton children={<DeleteIcon color="error" />} />
        </CustomDeleteDialog>
      ) : null}
    </Stack>
  );
};
export default ActionPanel;
