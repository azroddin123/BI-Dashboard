import { LinearProgress, Stack } from "@mui/material";
import React from "react";
import CustomPaper from "../UI/CustomPaper";

const ReportCard2 = ({ title, subTitle, value }) => {
  return (
    <CustomPaper
      paperSx={{
        border: "none",
      }}
      sx={{
        background: "linear-gradient(90.12deg, #303030 0.99%, #585858 97.5%)",
        color: "white",
      }}
      component={Stack}
      spacing={4}
    >
      {title}
      {subTitle}
      <LinearProgress
        sx={(theme) => {
          return {
            height: 20,
            borderRadius: "10px",
            background: "transparent",
            border: "1px #767676 solid",
            "& .MuiLinearProgress-bar": {
              borderRadius: "10px",
              background: theme.palette.primary.light,
              border: `1px ${theme.palette.primary.light} solid`,
            },
          };
        }}
        variant="determinate"
        value={value}
      />
    </CustomPaper>
  );
};

export default ReportCard2;
