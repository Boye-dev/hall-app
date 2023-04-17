import { Delete, ThumbUpSharp } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import AuthService from "../../auth_service";
import ExeatContext from "../../ExeatContext";
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
    field: "resolved",
    headerName: "Status",
    width: 110,
    renderCell: (cellValues) => (
      <Typography
        sx={{
          backgroundColor: cellValues.row.resolved ? "green" : "red",
          borderRadius: "5px",
          p: 1,
          color: "white",
          fontSize: "12px",
        }}
      >
        {cellValues.row.resolved ? "Resolved" : "Unresolved"}
      </Typography>
    ),
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
        to={`/senator/unresolved/${cellValues.row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button sx={{}} variant="text" color="primary">
          View
        </Button>
      </Link>
    ),
  },
];
const Unresolved = () => {
  const [unresolved, setUnresolved] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { getCurrentToken } = AuthService;
  const [page, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setIsSnackOpen, setSnackMessage, setSnackColor } =
    useContext(ExeatContext);
  const handlePageChange = (params) => {
    setLoading(true);
    setCurrentPage(params);
  };

  const [deleted, setDeleted] = useState(false);
  const [resolve, setResolve] = useState(false);
  const [selectedCheckbox, setSelected] = useState([]);
  const [refetch, setRefectch] = useState(false);
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelected(selectedRowsData);
    console.log(selectedRowsData);
  };
  const deleteReports = async () => {
    setDeleted(true);
    const ids = [];
    selectedCheckbox.map((item) => ids.push(item.id));
    const data = { id: ids };
    try {
      const response = await api.post("/reports/delete-report/", data, {
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
  const resolveReports = async () => {
    setResolve(true);
    const ids = [];
    selectedCheckbox.map((item) => ids.push(item.id));
    const data = { id: ids };
    try {
      const response = await api.post("/reports/toggle-resolve/", data, {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) {
        setIsSnackOpen(true);
        setSnackMessage("Resolved Succesfully");
        setSnackColor("green");
        setResolve(false);
        setLoading(true);
        setSelected([]);
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
      const response = await api.get("/reports/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
        params: {
          q: page + 1,
        },
      });

      if (response) {
        setTotalRows(response.data.count);

        setUnresolved(
          response.data.results.filter((item) => item.resolved === false)
        );
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
  const rows = unresolved;
  return (
    <>
      {/* {loading ? (
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
      ) : ( */}
      <Box
        sx={{
          backgroundColor: "#F1FFE7",
          pb: 10,
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
                Unresolved Issues
              </Typography>
            </Box>

            <Box sx={{ height: "68vh", width: "100%", mt: 2 }}>
              <DataGrid
                getRowId={(row) => row.id}
                rows={rows}
                // checkboxSelection
                columns={columns}
                rowCount={totalRows}
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
      {/* )} */}
    </>
  );
};

export default Unresolved;
