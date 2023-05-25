import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
const iconList = {
  name: <PersonIcon />,
  password: <PasswordIcon />,
  email: <AlternateEmailIcon />,
  role: <SupervisorAccountIcon />,
};

const CustomInput = (props) => {
  let inputProps = {};
  const { label } = props;
  let icon = null;
  icon = iconList[label.split(" ")[1].toLowerCase()];

  if (icon)
    inputProps.startAdornment = (
      <InputAdornment position="start">{icon}</InputAdornment>
    );

  return (
    <TextField
      id="outlined-start-adornment"
      {...props}
      sx={{ ...props.sx, "& input": { paddingLeft: "1rem" } }}
      InputProps={{
        ...inputProps,
        autoComplete: "off",
        shrink: true,
      }}
      fullWidth
      autoComplete="off"
    />
  );
};

export default CustomInput;
