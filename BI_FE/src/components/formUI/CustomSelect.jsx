import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const CustomSelect = ({ label, menuItems = [], ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" shrink={true}>
        {label}
      </InputLabel>
      <Select
        notched={true}
        InputLabelProps={{ shrink: true }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        {...props}
      >
        {menuItems?.map((role) => (
          <MenuItem key={role?.id} value={String(role?.id)}>
            {role?.role_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
