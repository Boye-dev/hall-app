import { Autorenew, Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [compile, setCompile] = useState([]);
  const { getCurrentToken } = AuthService;

  const { setIsSnackOpen, setSnackMessage, setSnackColor } =
    useContext(ExeatContext);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
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
      });

      if (response) setCompile(response.data.results);

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
  const rows = compile;
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "auto",
                  flexWrap: "wrap",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
                  Compile reports
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate("/admin/compile/compiled", {
                        state: selectedCheckbox,
                      })
                    }
                    disabled={selectedCheckbox.length < 1}
                    startIcon={<Autorenew />}
                    sx={{
                      backgroundColor: "#528265",

                      "&:hover": {
                        background: "#528265",
                      },
                    }}
                  >
                    Generate report
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
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Compile;
