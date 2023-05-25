import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function CustomTable({
  columns = null,
  data = null,
  children,
  SubtTableHead = <></>,
  sx = {},
}) {
  // if(1)
  // return <></>
  return (
    <TableContainer
      // component={Paper}
      sx={{
        "& .MuiTable-root": {
          ...sx,
          // background : 'red',
        
        },
        maxWidth : {xs : '56vw',md : '100%'},
        overflow : 'auto',
        margin : 'auto'
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {columns ? (
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell key={"column"} component="th">
                  <b> {column}</b>
                </TableCell>
              ))}
            </TableRow>
            {SubtTableHead ? SubtTableHead : null}
          </TableHead>
        ) : null}
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
