import { Add, Close, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "../../api/api";
import AuthService from "../../auth_service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ExeatContext from "../../ExeatContext";
const columns = [
  {
    field: "first_name",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email Address",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
];
const Users = () => {
  const [users, setUsers] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);

  const [create, setCreate] = useState(false);

  const [refetch, setRefectch] = useState(false);

  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { getCurrentToken } = AuthService;
  const [page, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (params) => {
    setLoading(true);
    setCurrentPage(params);
  };

  const [selectedCheckbox, setSelected] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelected(selectedRowsData);
    console.log(selectedRowsData);
  };
  const schema = yup.object().shape({
    last_name: yup.string().required("LastName Is Required"),
    email: yup.string().required("Email Is Required"),
    first_name: yup.string().required("Firstname Is Required"),
    username: yup.string().required("Username Is Required"),
    password: yup.string().required("Password Is Required"),
  });
  const { handleSubmit, trigger, control, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { setIsSnackOpen, setSnackMessage, setSnackColor } =
    useContext(ExeatContext);
  const onSubmit = async (data) => {
    setCreate(true);
    try {
      const response = await api.post("/account/register/", data, {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) {
        setIsSnackOpen(true);
        setSnackMessage("Created Succesfully");
        setSnackColor("green");
        setOpenCategory(false);
        reset();
        setCreate(false);
        setLoading(true);
        setRefectch(!refetch);
        setSelected([]);
      }
    } catch (error) {
      if (error.response) {
        setCreate(false);
        setIsSnackOpen(true);
        setSnackMessage(error.response.data.non_field_errors[0]);
        setSnackColor("red");
        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
  };
  const deleteReports = async () => {
    setDeleted(true);
    const ids = [];
    selectedCheckbox.map((item) => ids.push(item.id));
    const data = { id: ids };
    try {
      const response = await api.post("/account/delete/", data, {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) {
        setIsSnackOpen(true);
        setSnackMessage("Deleted Succesfully");
        setSnackColor("green");
        setDeleted(false);
        setLoading(true);
        setRefectch(!refetch);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setDeleted(false);
        setIsSnackOpen(true);
        setSnackMessage(error.response.data.id);
        setSnackColor("red");
        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
  };
  const fetchReports = async () => {
    try {
      const response = await api.get("/account/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
        params: {
          q: page + 1,
        },
      });

      if (response) {
        setUsers(response.data.results);
        setTotalRows(response.data.count);
      }
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
  }, [refetch, page]);
  const rows = users;
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
                height: "70vh",
                borderRadius: "8px",
                p: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",

                  flexWrap: "wrap",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
                  Users
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setOpenCategory(true)}
                    startIcon={<Add />}
                    sx={{
                      backgroundColor: "#528265",

                      "&:hover": {
                        background: "#528265",
                      },
                    }}
                  >
                    Add User
                  </Button>
                  <Button
                    sx={{ ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    color="error"
                    disabled={deleted || selectedCheckbox.length < 1}
                    startIcon={
                      deleted ? <CircularProgress size={15} /> : <Delete />
                    }
                    onClick={deleteReports}
                  >
                    Delete selected
                  </Button>
                </Box>
              </Box>

              <Box sx={{ height: "68vh", width: "100%", mt: 2 }}>
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={rows}
                  checkboxSelection
                  rowCount={totalRows}
                  columns={columns}
                  disableSelectionOnClick
                  pagination
                  paginationMode="server"
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  loading={loading}
                  onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Drawer
        anchor="right"
        open={openCategory}
        onClose={() => setOpenCategory(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: "700" }}>Create User</Typography>
          <Close
            sx={{ cursor: "pointer" }}
            onClick={() => setOpenCategory(false)}
          />
        </Box>
        <Divider />
        <Box sx={{ width: "350px", p: 2 }}>
          <Controller
            name="first_name"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="First Name"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("first_name");
                }}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Last Name"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("last_name");
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Email"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
            )}
          />{" "}
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Username"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("username");
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Password"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
            )}
          />
          <Box sx={{ mt: 5 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={create}
              startIcon={create && <CircularProgress size={15} />}
              onClick={handleSubmit(onSubmit)}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Users;
