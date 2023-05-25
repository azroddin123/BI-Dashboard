import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import CustomPaper from "../UI/CustomPaper";

const ReportCard1 = ({ img, name,value }) => {
  return (
    <CustomPaper component={Stack} direction="row" spacing={4}>
      <img
        src={img}
        style={{
          width: "20%",
          objectFit: "contain",
        }}
        alt={name}
      />
      <Stack spacing={0} pt={0}>
        <Typography variant="h5">
          <Typography
            color="primary.main"
            fontSize={"inherit"}
            component="span"
          >
            {value}{" "}
          </Typography>
          AED
        </Typography>
        <Typography>{name}</Typography>
      </Stack>
    </CustomPaper>
  );
};

export default ReportCard1;
