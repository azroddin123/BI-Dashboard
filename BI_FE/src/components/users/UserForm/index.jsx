import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import CustomInput from "../../formUI/CustomInput";
import CustomSelect from "../../formUI/CustomSelect";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useContext } from "react";
import CustomCheckbox from "../../formUI/CustomCheckbox";
import UserAndRolesContext from "../../../context/UserAndRolesContext";
const UserForm = ({
  modal = false,
  sx = {},
  defaultData = null,
  profile = false,
  handleClose,
  ...otherProps
}) => {
  const {
    roles: { list: {data : roleList} },
    userData,
    setUserData,
    userDataHandler,
    users: {
      postReq: { post, isLoading },
      putReq: { put, isLoading: isLoadingPut },
    },
  } = useContext(UserAndRolesContext);

  useEffect(() => {
    defaultData && setUserData(defaultData);
  }, [defaultData]);

  const { username, password, email, role_id } = userData;
  const onSubmit = (e) => {
    e.preventDefault();
    defaultData ? put(userData) : post(userData);
    handleClose()
  };
  return (
    <Grid
      item={defaultData && false}
      xs={12}
      md={6}
      component={defaultData ? Box : Paper}
      px={2}
      py={2}
      elevation={3}
      sx={sx}
      {...otherProps}
    >
      {!modal ? (
        <>
          <Typography variant={"h4"}>
            {defaultData || profile
              ? "View/Update your Information"
              : "Add New User"}
          </Typography>
          <Typography variant="body2" mb={4}>
            User will have a role, and its permission to action application.
          </Typography>
        </>
      ) : null}
      <Stack spacing={2} component="form" onSubmit={onSubmit}>
        <CustomInput
          required
          label="Enter Name"
          name="username"
          value={username}
          onChange={userDataHandler}
        />
        <CustomInput
          required
          label="Enter Password"
          type="password"
          name="password"
          value={password}
          onChange={userDataHandler}
        />
        <CustomInput
          required
          label="Enter Email"
          name="email"
          value={email}
          onChange={userDataHandler}
        />
        {!profile ? (
          <CustomSelect
            required
            label="Select Role"
            name="role_id"
            value={role_id}
            onChange={userDataHandler}
            menuItems={roleList?.data?.data}
          />
        ) : null}
        {!profile ? (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">Permissions</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCheckbox
                // checked={daily_revenue}
                name={"daily_revenue"}
                // onChange={userDataHa}
                label="Daily Revenue Report"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCheckbox
                // checked={monthly_revenue}
                name={"monthly_revenue"}
                // onChange={userDataHa}
                label="Monthly Revenue Report"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCheckbox
                // checked={revenue_actual}
                name={"revenue_actual"}
                // onChange={userDataHa}
                label="Revenue Actual Report"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCheckbox
                // checked={revenue_budget}
                name={"revenue_budget"}
                // onChange={userDataHa}
                label="Revenue Budget Report"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCheckbox
                // checked={pl_actual}
                name={"pl_actual"}
                // onChange={userDataHa}
                label="PL Actual Report"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCheckbox
                // checked={pl_budget}
                name={"pl_budget"}
                // onChange={userDataHa}
                label="PL Budget Report"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCheckbox
                // checked={str_report}
                name={"str_report"}
                // onChange={userDataHa}
                label="STR Report"
              />
            </Grid>
          </Grid>
        ) : null}
        <Button
          disabled={isLoading}
          type
          variant="contained"
          endIcon={<PersonAddIcon />}
          sx={{
            py: 1,
            px: 3,
            // alignSelf: "flex-start"
          }}
        >
          {!(defaultData || profile) ? "Add New User" : "Update User"}
        </Button>
      </Stack>
    </Grid>
  );
};

export default UserForm;
