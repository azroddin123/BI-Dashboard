import { Grid } from "@mui/material";
import React from "react";
import BarChart from "../graphs/BarChart";
import PieChart from "../graphs/PieChart";
import CircularProgressSection from "../Layout/CircularProgressSection";
import CustomPaper from "../UI/CustomPaper";
import CustomTable from "../UI/CustomTable";
import { StyledTableCell } from "../UI/StyledTableCell";
import { StyledTableRow } from "../UI/StyledTableRow";
import MonthlyReportCard from "./MonthlyReportCard";

const MonthlyReport = ({isLoading,data}) => {
  if(isLoading) {
    return <CircularProgressSection/>
  }

  console.log(data)
  const tableData = {
    payroll_and_related : data?.payroll_and_related,
    other_expenses : data?.other_expenses,
    utility : data?.utility,
    cost_of_sale : data?.cost_of_sale,
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <MonthlyReportCard name='GOP' data = {data?.GOP}/>
      </Grid>
      <Grid item xs={12} md={6}>
      <MonthlyReportCard name='NOP' data = {data?.NOP} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomPaper sx = {{height :{sm :  '400px',xs : '400px', textAlign : 'center'},     aspectRatio : '1/1'}} >
          <PieChart _data = {data} />
        </CustomPaper>
      </Grid>{" "}
      <Grid item xs={12} md={6}>
      <CustomPaper sx={{ p: 0 ,height : '100%'}} paperSx = {{height : '100%'}} >
          <CustomTable
            columns={["Description", "Amount", "%"]}
          >
            {
              Object.entries(tableData)?.map(([name, row], index) => <StyledTableRow>
                <StyledTableCell>{name.toLocaleUpperCase().replaceAll("_"," ")}</StyledTableCell>
                <StyledTableCell>{row?.actual?.amount}</StyledTableCell>
                <StyledTableCell>{(row?.actual?.percentage * 100).toFixed(2)} %</StyledTableCell>
              </StyledTableRow>)
            }
          </CustomTable>
        </CustomPaper>
      </Grid>
    </Grid>
  );
};

export default MonthlyReport;
