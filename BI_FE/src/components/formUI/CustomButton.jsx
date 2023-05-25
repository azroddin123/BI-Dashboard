import { Button, useMediaQuery } from '@mui/material'
import React from 'react'

const CustomButton = ({children,onClick,...otherProps}) => {
  const isMobile = useMediaQuery('(max-width : 600px)')

  return (
    <Button
    onClick = {e => {
        e.stopPropagation();
        onClick(e)
    }}
    variant='contained'
    {...otherProps}
    sx = {{
        textTransform : 'revert',
        borderRadius: "20px",
        minWidth : isMobile ? 'auto' : '160px'
    }}
    >{children}</Button>
  )
}

export default CustomButton