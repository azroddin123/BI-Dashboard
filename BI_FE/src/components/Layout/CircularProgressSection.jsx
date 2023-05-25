import { Box } from '@mui/material'
import React from 'react'
import CustomCirclularProgress from './CustomCirclularProgress'

const CircularProgressSection = () => {
  return (
    <Box
    sx={{
      display: "grid",
      placeContent: "center",
      minHeight: "60vh",
    }}
  >
    <CustomCirclularProgress
      variant="indeterminate"
      size={100}
      title="Loading"
    />
  </Box>
  )
}

export default CircularProgressSection