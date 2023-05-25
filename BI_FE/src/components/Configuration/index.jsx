import { Divider, Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
// import { GlobalContext } from "../../cotext/GlobalContext";
import RoleForm from "../roles/RoleForm";
import UserForm from "../users/UserForm";

const Configuration = () => {
//   const { resetUser, resetRole } = useContext(GlobalContext);
//   // setUser();
//   useEffect(() => {
//     resetUser();
//     resetRole();
//   }, []);

  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      spacing={4}
      mt={0}
      sx={{
        "& >*:not(:nth-of-type(2))": {
          flex: 1,
        },
      }}
    >
      <UserForm />
      <Divider orientation={"vertical"} flexItem>
        OR
      </Divider>
      <RoleForm />
    </Stack>
  );
};

export default Configuration;
