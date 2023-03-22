import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSlotProps } from "@mui/base";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { DataGrid } from "@mui/x-data-grid";
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
    field: "date",
    headerName: "Date",
    width: 150,
  },
];
const History = () => {
  const chartData = {
    labels: ["Plumbing", "Electrical", "Carpentry", "Aluminium"],
    datasets: [
      {
        label: "Works",
        data: [90, 20, 50, 60],
        backgroundColor: ["#061b64", "#7a0c2e", "yellow", "green"],
      },
    ],
  };
  const [unresolved, setUnresolved] = useState([
    {
      id: "1",
      issue: "Bad Locker",
      category: "Capentry",
      room: "SF 11",
      status: "unresolved",
      date: "05/01/2023",
    },
  ]);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const rows = unresolved;
  const navigate = useNavigate();
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
            <Typography
              sx={{ fontWeight: "700", fontSize: "15px", cursor: "pointer" }}
            >
              History
            </Typography>
            <Box sx={{ display: { xs: "", md: "flex" } }}>
              <Box
                sx={{ height: "68vh", width: { xs: "100%", md: "50%" }, mt: 2 }}
              >
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
              </Box>{" "}
              <Box
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
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default History;
