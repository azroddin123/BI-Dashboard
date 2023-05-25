import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    const goBackHandler = () => {
    navigate(-1)
    }
  return (
   <Stack maxWidth={'450px'} m = 'auto' mt = {6} alignItems={'center'} spacing = {3} >
    <Typography variant = {'h2'} >Not Found 404</Typography>
    <Stack direction = 'row' spacing = {2} >
        <Button variant='contained' onClick={goBackHandler} >
            Go back
        </Button>
    </Stack>
   </Stack>
  )
}

export default NotFound