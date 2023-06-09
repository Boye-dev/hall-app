import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import AuthService from "../../auth_service";
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
        to={`/admin/resolved/${cellValues.row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button sx={{}} variant="text" color="primary">
          View
        </Button>
      </Link>
    ),
  },
];
const Resolved = () => {
  const [resolved, setResolved] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { getCurrentToken } = AuthService;
  const [page, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (params) => {
    setLoading(true);
    setCurrentPage(params);
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
        setResolved(
          response.data.results.filter((item) => item.resolved === true)
        );
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
  }, [page]);
  const rows = resolved;
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
            <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
              Resolved Issues
            </Typography>
            <Box sx={{ height: "68vh", width: "100%", mt: 2 }}>
              <DataGrid
                getRowId={(row) => row.id}
                rows={rows}
                rowCount={totalRows}
                columns={columns}
                disableSelectionOnClick
                pagination
                paginationMode="server"
                pageSize={pageSize}
                onPageChange={handlePageChange}
                loading={loading}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};

export default Resolved;
