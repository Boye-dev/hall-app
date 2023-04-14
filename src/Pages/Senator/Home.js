import { yupResolver } from "@hookform/resolvers/yup";
import { Add, ArrowForward, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const columns = [
  {
    field: "issue",
    headerName: "Issue",
    width: 100,
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
        to={`/senator/reported/${cellValues.row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button sx={{}} variant="text" color="primary">
          View
        </Button>
      </Link>
    ),
  },
];
const Home = () => {
  const navigate = useNavigate();
  const [openReport, setOpenReport] = useState(false);
  const [resolved, setResolved] = useState([
    {
      id: "1",
      issue: "Bad Locker",
      category: "Capentry",
      room: "SF 11",
      status: "resolved",
      date: "05/01/2023",
    },
  ]);

  const rows = resolved;
  const schema = yup.object().shape({
    username: yup.string().required("User Number Is Required"),
    password: yup.string().required("Password Is Required"),
  });
  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F1FFE7",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          height: { xs: "auto", md: "100vh" },
          pb: 15,
          ml: { xs: "0", md: "230px" },
        }}
      >
        <Box sx={{ pt: 10, pl: 5, pr: 5 }}>
          <Box
            onClick={() => setOpenReport(true)}
            sx={{
              width: "300px",
              height: "200px",
              backgroundColor: "white",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Add sx={{ fontSize: "50px" }} />
              <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
                Report New Issue
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ pt: 10, pl: 5, pr: 5 }}>
          <Box
            sx={{
              width: { xs: "300px", md: "450px" },
              height: "400px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 3,
                pr: 3,
                pt: 3,
              }}
            >
              <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
                Past Reports
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/senator/reported")}
              >
                <Typography sx={{ fontSize: "12px" }}>View Details</Typography>
                <ArrowForward />
              </Box>
            </Box>
            <Box sx={{ p: 1, width: "auto", height: "300px" }}>
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
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={openReport}
        onClose={() => setOpenReport(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: "700" }}>Report New Issue</Typography>
          <Close
            sx={{ cursor: "pointer" }}
            onClick={() => setOpenReport(false)}
          />
        </Box>
        <Divider />
        <Box sx={{ width: "350px", p: 2 }}>
          <Controller
            name="room"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="room">Select Room</InputLabel>
                <Select
                  labelId="room"
                  id="room"
                  label="Select Room"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    trigger("room");
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="room">Select Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  label="Select Category"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    trigger("category");
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="issue"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="issue">Select Issue</InputLabel>
                <Select
                  labelId="issue"
                  id="issue"
                  label="Select Issue"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    trigger("issue");
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )}
          />{" "}
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Description"
                fullWidth
                multiline
                rows={10}
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("description");
                }}
              />
            )}
          />
          <Box sx={{ mt: 5 }}>
            <Button variant="contained" color="primary" fullWidth>
              Report
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Home;
