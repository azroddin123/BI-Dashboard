import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CircularProgressGraph = ({value = 0}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // pt: 3,
        // pb: 2,
        position: "relative",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={200}
        color="success"
      />
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">{value}% </Typography>
        <Typography variant="body1">Completed </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressGraph;
