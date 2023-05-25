import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CustomCheckbox = ({ label = "Enter Label", ...props }) => {
  return <FormControlLabel control={<Checkbox {...props} />} label={label} />;
};

export default CustomCheckbox;
