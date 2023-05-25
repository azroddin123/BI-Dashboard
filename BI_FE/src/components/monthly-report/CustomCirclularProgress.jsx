import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { getPercentage } from '../../utils/getPercentage'

const CustomCirclularProgress = ({title,sx,data,...otherProps}) => {
  return (
    <Box position={"relative"}>
      <CircularProgress
        thickness={4}
        sx={(theme) => ({
          "& .MuiCircularProgress-circle": {
            color: theme.palette.primary.light,
          },
          "& circle": {
            strokeLinecap: "round",
          },
          ...sx
        })}
        size={200}
        variant="determinate"
        value={80}
        color="primary"
        {...otherProps}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          "& > *": {
            color: "white",
          },
        }}
      >{
        title || 
        <>
        <Typography variant="h4">{getPercentage(data?.MTD?.actual?.percentage)}%</Typography>
        <Typography variant="h5" component="span">
          GOP
        </Typography>&nbsp;<Typography component="span">Actual</Typography>
        </>
        }
      </Box>
    </Box>
  )
}

export default CustomCirclularProgress