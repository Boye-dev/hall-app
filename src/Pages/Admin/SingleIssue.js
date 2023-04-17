import { ArrowBack, Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import AuthService from "../../auth_service";
import ExeatContext from "../../ExeatContext";

const SingleIssue = () => {
  const navigate = useNavigate();
  const { getCurrentToken } = AuthService;
  const { id } = useParams();
  const [reported, setReported] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const { setIsSnackOpen, setSnackMessage, setSnackColor } =
    useContext(ExeatContext);
  const fetchReports = async () => {
    try {
      const response = await api.get(`/reports/${id}/`, {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) {
        setReported(response.data);
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
  // console.log(reported);
  const deleteReports = async () => {
    setDeleted(true);
    const ids = [id];

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
        navigate(-1);
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
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <>
      {" "}
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
                onClick={() => navigate(-1)}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ArrowBack /> <Box sx={{ ml: 1 }}>Go Back</Box>
                </Box>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  mt: 5,
                  fontWeight: "700",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography sx={{ fontWeight: "700" }}>
                  {reported.issue}
                </Typography>{" "}
                <Typography sx={{ fontWeight: "700" }}>
                  Room Number: {reported.room}
                </Typography>
              </Box>{" "}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  mt: 2,
                  fontWeight: "700",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography sx={{ fontWeight: "700" }}>
                  Category: {reported.category}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  fontWeight: "700",
                  p: 1,
                }}
              >
                <Typography sx={{ fontWeight: "700" }}>Description </Typography>
                <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                  <Typography>{reported.description}</Typography>
                  <img src={reported.snapshot} />
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  Status:{" "}
                  <span style={{ fontWeight: "700" }}>
                    {reported.resolved ? "Resolved" : "Unresolved"}
                  </span>
                </Typography>
                <Button
                  sx={{ ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 } }}
                  variant="contained"
                  color="error"
                  disabled={deleted}
                  startIcon={
                    deleted ? <CircularProgress size={15} /> : <Delete />
                  }
                  onClick={deleteReports}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleIssue;
