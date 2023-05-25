import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomPaper from "../UI/CustomPaper";
import CustomTable from "../UI/CustomTable";
import ReportCard1 from "./ReportCard1";
import ReportCard2 from "./ReportCard2";

import RoomsPng from "../../assets/images/rooms.png";
import FbPng from "../../assets/images/f&b.png";
import OodPng from "../../assets/images/ood.png";
import TrPng from "../../assets/images/tr.png";

import BarChart from "../../components/graphs/BarChart";
import CircularProgressSection from "../Layout/CircularProgressSection";
import { useEffect } from "react";
import { getPercentage } from "../../utils/getPercentage";
import { StyledTableRow } from "../UI/StyledTableRow";
import { StyledTableCell } from "../UI/StyledTableCell";

const DailyReport = ({isLoading, data}) => {
  // console.log({data})
  const [cardData,setCardData] = useState([])
  useEffect(()=>{
    setCardData([
      { id: 1, img: RoomsPng, name: "Rooms", value : data?.rooms?.actual?.amount },
      { id: 2, img: FbPng, name: "Food & Beverages", value : data?.f_b?.actual?.amount },
      { id: 3, img: OodPng, name: "OOD", value : data?.rooms?.actual?.amount },
      { id: 4, img: TrPng, name: "Total Revenue", value : data?.total_revenue?.actual?.amount },
    ])
  },[data])
  if(isLoading) {
    return <CircularProgressSection/>
  }
  return (
    <Grid container spacing={2}>
      {cardData?.map(({ id, img, name,value }) => (
        <Grid item xs={12} md={3} key={id}>
          <ReportCard1 img={img} name={name} value = {value} />
        </Grid>
      ))}
      <Grid item xs={12} md={6}>
        <ReportCard2
          title={
            <Typography variant="h4">
              {getPercentage(data?.occupancy?.actual?.percentage)}%
              <Typography variant="h5" component="span" fontWeight={"300"}>
                {" "}
                Occupancy by percentage (Actual)
              </Typography>
            </Typography>
          }
          subTitle={
            <Typography fontWeight="300">
              Occupancy rate is{" "}
              <Typography component="span" color="primary.light">
                {" "}
                {data?.occupancy?.budget?.percentage < data?.occupancy?.actual?.percentage ? 'higher' : 'lower'} than
              </Typography>{" "}
              by budget is{" "}
              <Typography component="span" color="primary.light">
                {getPercentage(data?.occupancy?.budget?.percentage - data?.occupancy?.actual?.percentage)}%
              </Typography>
            </Typography>
          }
          value={54}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ReportCard2
          title={
            <Typography variant="h4">
              12,034 AED
              <Typography variant="h5" component="span" fontWeight={"300"}>
                {" "}
                Average Daily Rate
              </Typography>
            </Typography>
          }
          subTitle={
            <Typography fontWeight="300">
              Average Daily rate is
              <Typography component="span" color="primary.light">
                {" "}
                higher than
              </Typography>{" "}
              previous day by{" "}
              <Typography component="span" color="primary.light">
                0.34%
              </Typography>
            </Typography>
          }
          value={54}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomPaper sx={{ height: "425px",aspectRatio : {xs : '1.3/1',md  : 'auto'} }}>
          <BarChart />
        </CustomPaper>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomPaper sx={{ p: 0 }}>
          <CustomTable
            columns={["Description", "MTD Actual", "MTD Budget", "MTD LY"]}
          >
              {
        data && Object.entries(data).slice(0,-2)?.map((row) => (
              <StyledTableRow key={row[0]}>
                <StyledTableCell>{row[0].replace('_'," ").toUpperCase()}</StyledTableCell>
                <StyledTableCell>{(row[1].actual?.amount)|| row[1].actual?.percentage * 100 + '%'}</StyledTableCell>
                <StyledTableCell>{(row[1].budget?.amount)|| row[1].actual?.percentage * 100 + '%'}</StyledTableCell>
                <StyledTableCell>{(row[1].LY?.amount)|| row[1].actual?.percentage * 100 + '%'}</StyledTableCell>
              </StyledTableRow>
            ))
            }
          </CustomTable>
        </CustomPaper>
      </Grid>
    </Grid>
  );
};

export default DailyReport;
