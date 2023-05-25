import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment';

export default function CustomDatePicker({handler,d = null}) {
  const [value, setValue] = React.useState(d ? `${d.slice(3,5)}-${d.slice(0,2)}-${d.slice(-2)}` : dayjs(moment(new Date).format('MM-DD-YY')));

  return (
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        // openTo="year"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(newValue)
          handler(moment(newValue.$d).format('DD-MM-YY'));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
  );
}
