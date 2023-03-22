import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const columns = [
  {
    field: "issue",
    headerName: "Issue",
    width: 200,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "room",
    headerName: "Room",
    width: 120,
  },

  {
    field: "status",
    headerName: "Status",
    width: 110,
    renderCell: (cellValues) => (
      <Typography
        sx={{
          backgroundColor:
            cellValues.row.status === "resolved"
              ? "green"
              : cellValues.row.status === "unresolved"
              ? "red"
              : "gray",
          borderRadius: "5px",
          p: 1,
          color: "white",
          fontSize: "12px",
        }}
      >
        {cellValues.row.status}
      </Typography>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "view",
    headerName: "",
    width: 150,
    renderCell: (cellValues) => (
      <Link
        to={`/admin/compile/${cellValues.row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button sx={{}} variant="text" color="primary">
          View
        </Button>
      </Link>
    ),
  },
];
const Compile = () => {
  const navigate = useNavigate();
  const [compile, setCompile] = useState([
    {
      id: "1",
      issue: "Bad Locker",
      category: "Capentry",
      room: "SF 11",
      status: "resolved",
      date: "05/01/2023",
    },
  ]);

  const rows = compile;
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F1FFE7",

          height: "auto",
          ml: { xs: "0", md: "230px" },
        }}
      >
        <Box sx={{ padding: "4%", paddingTop: "6%" }}>
          <Box
            sx={{
              backgroundColor: "white",
              height: "auto",
              borderRadius: "8px",
              p: 5,
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
              Select issues for rectification
            </Typography>
            <Box sx={{ height: "68vh", width: "100%", mt: 2 }}>
              <DataGrid
                getRowId={(row) => row.id}
                rows={rows}
                checkboxSelection
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
            <Box sx={{ textAlign: "right", mt: 5 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate("/admin/compile/compiled")}
              >
                Compile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Compile;
