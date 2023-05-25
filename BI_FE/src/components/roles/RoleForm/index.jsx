import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import CustomInput from "../../formUI/CustomInput";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useContext } from "react";
import UserAndRolesContext from "../../../context/UserAndRolesContext";
import CircularProgressSection from "../../Layout/CircularProgressSection";

const RoleForm = ({
  modal = false,
  sx = {},
  defaultData = null,
  handleClose = () => {},
}) => {
  const {
    roleData,
    setRoleData,
    roleDataHandler,
    roles: {
      list: {data, isLoading : isLoadingRoles},
      postReq: { post, isLoading },
      putReq: { put, isLoading : isLoadingPut },
    },
  } = useContext(UserAndRolesContext);

  useEffect(
    () => {defaultData && setRoleData(defaultData)},[defaultData]
  )

  const onSubmit = (e) => {
    e.preventDefault();
    defaultData ? put(roleData) : post(roleData);
    handleClose()
  };
  return (
    <Grid
      item
      xs={12}
      md={6}
      component={Paper}
      px={2}
      py={2}
      elevation={3}
      sx={sx}
    >
      {!modal ? (
        <>
          <Typography variant={"h4"}>Add New Role</Typography>
          <Typography variant="body2" mb={4}>
            roles will define the role name only.
          </Typography>
        </>
      ) : null}
      <Stack
        spacing={2}
        sx={{ height: "calc(100% - 93px)" }}
        component="form"
        onSubmit={onSubmit}
      >
        <CustomInput
          label="Enter Role"
          name="role_name"
          value={roleData?.role_name}
          onChange={roleDataHandler}
          sx={{ mb: 2 }}
        />
        {!defaultData && <Box sx = {{maxHeight : '350px', overflow : 'auto'}} >
          <Typography sx = {{
            position : 'sticky',
            top : 0,
            background : 'white',
            padding : 1
          }} >Roles Available : </Typography>
          {
          isLoadingRoles ? <CircularProgressSection/> : 
          data?.data?.data?.map(role =><Typography id = {role.id} sx = {{
            pb : 1,
            mb : 1,
            pl : 1,
            borderBottom : '1px gray solid'
          }} >{role.role_name}</Typography>)}
        </Box>}
        <Button
          disabled = {isLoading || isLoadingPut}
          type="submit"
          variant="contained"
          endIcon={<GroupAddIcon />}
          sx={{
            py: 1,
            px: 3,
            mt: "auto",
            marginTop: "auto !important",
          }}
        >
          {!modal ? "Add New" : "Update"} Role
        </Button>
      </Stack>
    </Grid>
  );
};

export default RoleForm;
