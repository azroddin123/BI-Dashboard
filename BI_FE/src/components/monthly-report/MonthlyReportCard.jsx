import { CircularProgress, Divider, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import { getPercentage } from '../../utils/getPercentage'
import CustomPaper from '../UI/CustomPaper'
import CustomCirclularProgress from './CustomCirclularProgress'

const MonthlyReportCard = ({name,data}) => {

  return (
    <CustomPaper
    sx={{
      background:
        "linear-gradient(-270.12deg, #303030 0.99%, #585858 97.5%)",p : 5
    }}
  >
    <Stack direction={{md : "row" , xs : 'column'}} spacing={3} mb={3}>
   <CustomCirclularProgress data = {data} />
    <Stack spacing={3} justifyContent="center">
      <Box
        sx={{
          "& > *": {
            color: "white",
          },
        }}
      >
        <Typography
          variant="h4"
          component={"span"}
          sx={(theme) => ({ color: theme.palette.primary.light })}
        >
          {getPercentage(data?.MTD?.budget?.percentage - data?.MTD?.actual?.percentage)}%
        </Typography>
        
        <Typography variant="h5" component={"span"}>
          less variation than {name}
        </Typography>{" "}
        <Typography component={"span"}>budget</Typography>{" "}
      </Box>
      <Typography
        sx={(theme) => ({
          color: "white",
          "& > span": {
            color: theme.palette.primary.light,
          },
        })}
      >
        {name} MTD <span>{data?.MTD?.actual?.percentage > data?.YTD?.actual?.percentage ? 'higher' : 'lower'} than</span> YTD by <span>{getPercentage(data?.MTD?.actual?.percentage - data?.YTD?.actual?.percentage)}%</span> (Actual)
      </Typography>
    </Stack>
  </Stack>

  <Table name='Month' data = {data?.MTD} />
  <Table name="Year" data = {data?.YTD} />
  </CustomPaper>
  )
}

const Table = ({name,data}) => {
  return   <CustomPaper
  paperSx={{
    borderColor : '#A3FF9C',mt : 2,pb : 0
  }}
  sx  ={{
 
    backgroundColor : '#4D4646',
    '& span' : {
      flex: '0 0 15%',
      textAlign: 'center',
      color : 'white'
    },
    '& .MuiDivider-root' : {
      backgroundColor : 'white'
    }
  }}>
    <Typography textAlign={'center'} color='white' mb ={2} >{name} To Date (Amount)</Typography>
    <Stack direction = 'row' spacing = {2} justifyContent='space-between' px={3} py ={1} sx = {{width : {xs : '100%',md : '100%'}}} >
        <span>Actual</span>
        <Divider orientation="vertical" flexItem/>
        <span>Budget</span>
        <Divider orientation="vertical" flexItem/>
        <span>LY</span>
    </Stack>
    <Stack direction = 'row' spacing = {2} justifyContent='space-between' px={3} py ={1} pb = {2} sx = {{width : {xs : '100%',md : '100%'}}}>
        <span>{data?.actual?.amount}</span>
        <Divider orientation="vertical" flexItem/>
        <span>{data?.budget?.amount}</span>
        <Divider orientation="vertical" flexItem/>
        <span>{data?.LY?.amount}</span>
    </Stack>
  </CustomPaper>
}

export default MonthlyReportCard