import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import AuthService from "../../auth_service";

import api from "../../api/api";
const columns = [
  {
    field: "issue",
    headerName: "Issue",
    width: 200,
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
  },
  {
    field: "room",
    headerName: "Room",
    width: 120,
  },

  {
    field: "date_added",
    headerName: "Date",
    width: 150,
    renderCell: (cellValues) => {
      const date = new Date(cellValues.row.date_added);
      return (
        <Typography>
          {`${date.getFullYear()}/${
            date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`
          }/${date.getDate()}`}
        </Typography>
      );
    },
  },
  {
    field: "view",
    headerName: "",
    width: 150,
    renderCell: (cellValues) => (
      <Link
        to={`/admin/history/${cellValues.row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button sx={{}} variant="text" color="primary">
          View
        </Button>
      </Link>
    ),
  },
];
const History = () => {
  const [reported, setReported] = useState([]);
  const { getCurrentToken } = AuthService;
  const rows = reported;
  const [loading, setLoading] = useState(true);
  const fetchReports = async () => {
    try {
      const response = await api.get("/reports/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setReported(response.data.results);

      setLoading(false);
    } catch (error) {
      if (error.response) {
        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            backgroundColor: "#F1FFE7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            ml: { xs: "0", md: "230px" },
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
              <Typography
                sx={{ fontWeight: "700", fontSize: "15px", cursor: "pointer" }}
              >
                History
              </Typography>
              <Box sx={{ display: { xs: "", md: "flex" } }}>
                <Box sx={{ height: "68vh", width: { xs: "100%" }, mt: 2 }}>
                  <DataGrid
                    getRowId={(row) => row.id}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                  />
                </Box>{" "}
                {/* <Box
                sx={{
                  height: "auto",
                  width: { xs: "100%", md: "50%" },
                  mt: 2,
                  ml: 1,
                  p: 2,
                  border: "1px solid black",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Statistics
                </Typography>{" "}
                <Typography
                  sx={{
                    fontSize: "15px",
                    cursor: "pointer",
                    mt: 2,
                    fontWeight: "500",
                  }}
                >
                  Amount of repairs done in each sector
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel id="demo-select-small">Filter</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ height: "200px", width: "100%", mt: 2 }}>
                  <DataGrid
                    getRowId={(row) => row.id}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "15px",
                    cursor: "pointer",
                    mt: 2,
                    fontWeight: "700",
                  }}
                >
                  Data Visualization
                </Typography>
                <Box sx={{ height: "300px", width: "100%" }}>
                  <Pie data={chartData} />
                </Box>
              </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default History;
