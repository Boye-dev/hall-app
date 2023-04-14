import { Delete, Print } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
const Compiled = () => {
  const location = useLocation();
  const [selectedCheckbox, setSelected] = useState([]);
  const [data, setData] = useState(location.state);
  const navigate = useNavigate();
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelected(selectedRowsData);
    console.log(selectedRowsData);
  };
  const rows = data;
  const handleRemove = () => {
    const activeIds = [];
    selectedCheckbox.map((item) => activeIds.push(item.id));
    setData(data.filter((item) => activeIds.indexOf(item.id) === -1));
  };
  useEffect(() => {
    navigate("/admin/compile/compiled", {
      state: data,
    });
  }, [data, navigate]);
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
                Selected issues
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  startIcon={<Print />}
                  disabled={data.length < 1}
                  onClick={() =>
                    navigate("/admin/print", {
                      state: data,
                    })
                  }
                  sx={{
                    backgroundColor: "#528265",

                    "&:hover": {
                      background: "#528265",
                    },
                  }}
                >
                  Print report
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  color="error"
                  disabled={selectedCheckbox.length < 1}
                  startIcon={<Delete />}
                  onClick={handleRemove}
                >
                  Remove selected
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
    </>
  );
};

export default Compiled;
