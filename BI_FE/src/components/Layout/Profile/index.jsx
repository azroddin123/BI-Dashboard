import { Avatar, Typography, useMediaQuery } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const Profile = () => {
  const isMobile = useMediaQuery('(max-width : 600px)')
  return (
    <Stack direction = 'row' spacing={2}>
        <Avatar sx ={{ bgcolor  : 'primary.main' ,
        width: 45, height: 45 
      }}>A</Avatar>
      {isMobile !== true &&  <Stack>
          <Typography fontWeight ='500' >Arbaz Ansari</Typography>
          <Typography variant='subtitle2' >Super Admin</Typography>
        </Stack>}
    </Stack>)
};

export default Profile;