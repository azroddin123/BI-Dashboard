import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { StyledTableCell } from "./StyledTableCell";
import { StyledTableRow } from "./StyledTableRow";
import { TableRow } from "@mui/material";

export default function CustomTable({
  columns = ["pass columns prop please"],
  children ,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        height : '100%',
        '& > .MuiTable-root' : {minWidth :"auto"},
        ".MuiTableRow-root": {
        },
        ".MuiTableCell-root": {
        },
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns?.map((c, key) => (
              <StyledTableCell key={key}>{c}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
