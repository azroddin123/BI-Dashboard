import { Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTableForm from "./CustomTableForm";
import CustomTableWrapper from "./CustomTableWrapper";

const CustomTableLayout = ({ url, columns, children, formProps,isFormData = false,putFormData = null }) => {
  const [defaultData, setDefaultData] = useState(null);
  const resetDefaultDataHandler = () => setDefaultData(null);
  return (
    <>
      <Grid
        container
        spacing={2}
        flexDirection={{ xs: "column-reverse", md: "row" }}
      >
        <Grid item xs={12} md={8}>
          <CustomTableWrapper
            url={url}
            columns={columns}
            setDefaultData={setDefaultData}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTableForm
          putFormData = {putFormData}
          isFormData = {isFormData}
            formProps={formProps}
            form={children}
            url={url}
            defaultData={defaultData}
            resetDefaultDataHandler={resetDefaultDataHandler}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomTableLayout;
