import React from "react";
import CustomDialog from "./CustomDialog";
const CustomDeleteDialog = ({ children, id, name, variant, url }) => {
  return (
    <CustomDialog
      children={children}
      deleteDialog
      variant={variant}
      name={name}
      id={id}
      url={url}
    />
  );
};

export default CustomDeleteDialog;
