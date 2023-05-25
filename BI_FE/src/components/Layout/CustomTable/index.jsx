import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";

export default function CustomTable({
  rows = [],
  columns = {},
  url = null,
  modal = {},
  isLoading = false,
  rowCount,
  page = 0,
  setPage = () => {}
}) {
  return (
    <div style={{ height: "80vh", width: "100%", marginTop: "0rem" }}>
      <DataGrid
        rows={rows}
        columns={[...columns]}
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: LinearProgress,
        }}
        loading={isLoading}
        rowCount={rowCount || 0}
        rowsPerPageOptions={[10]}
        pagination
        page={page}
        pageSize={10}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
      />
    </div>
  );
}
