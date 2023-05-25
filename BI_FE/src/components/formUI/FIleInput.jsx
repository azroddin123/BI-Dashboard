import { Button } from '@mui/material'
import React from 'react'

const FIleInput = ({label,id,onChange,sx,...props}) => {
  return (
    <Button variant="contained"  component = {'label'} htmlFor = {id} >
    <input  id = {id}  style = {{display  : 'none',...sx}} type = 'file' onChange = {e => onChange(e.target.files[0])}     {...props} />
    {label || 'Add Label'}
  </Button>
  )
}

export default FIleInput