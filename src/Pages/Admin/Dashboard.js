import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { ReactComponent as Reported } from "../../Assets/scgs/dashReport.svg";
import { ReactComponent as Unresolved } from "../../Assets/scgs/dashUnres.svg";
import { ReactComponent as Resolved } from "../../Assets/scgs/dashRes.svg";
import api from "../../api/api";
import AuthService from "../../auth_service";
import "chart.js/auto";
const Dashboard = () => {
  const { getCurrentToken } = AuthService;
  const [line, setLine] = useState({});
  const [bar, setBar] = useState([]);
  const [total, setTotal] = useState([]);

  const [barLoading, setBarLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(true);

  const [lineLoading, setLineLoading] = useState(true);

  const lineData = {
    labels: Object.keys(line),
    datasets: [
      {
        label: "Issue",
        data: Object.values(line),
        borderColor: "rgb(82,130,101)",
        backgroundColor: "rgba(82,130,101,0.5)",
      },
    ],
  };
  const barData = {
    labels: bar.map((item) => item.name),
    datasets: [
      {
        label: "Category",
        data: bar.map((item) => item.amount_issues),
        borderColor: "rgb(82,130,101)",
        backgroundColor: "rgba(82,130,101)",
      },
    ],
  };

  const fetchReports = async () => {
    try {
      const response = await api.get("/statistics/issues-per-year/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setLine(response.data);
      setLineLoading(false);
    } catch (error) {
      if (error.response) {
        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
  };
  const fetchBar = async () => {
    try {
      const response = await api.get("/statistics/issues-per-category/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setBar(response.data.results);
      setBarLoading(false);
    } catch (error) {
      if (error.response) {
        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
  };
  const fetchTotal = async () => {
    try {
      const response = await api.get("/statistics/issues/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setTotal(response.data);
      setTotalLoading(false);
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
    fetchBar();
    fetchTotal();
  }, []);
  return (
    <>
      {lineLoading || barLoading || totalLoading ? (
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
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "25px",
              cursor: "pointer",
              pl: 10,
              pt: 5,
            }}
          >
            Dashboard
          </Typography>
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",

              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: { xs: "100%", md: "25%" },
                height: "200px",
                borderRadius: "10px",
                p: 2,

                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                  Reported
                </Typography>
                <Typography>Issues</Typography>
                <Typography sx={{ mt: 5, fontWeight: "700", fontSize: "30px" }}>
                  {Object.values(total).reduce((a, b) => a + b, 0)}
                </Typography>
              </Box>
              <Reported />
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                width: { xs: "100%", md: "25%" },
                height: "200px",
                borderRadius: "10px",
                p: 2,
                m: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                  Resolved
                </Typography>
                <Typography>Issues</Typography>
                <Typography sx={{ mt: 5, fontWeight: "700", fontSize: "30px" }}>
                  {total.resolved}
                </Typography>
              </Box>
              <Resolved />
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                width: { xs: "100%", md: "25%" },
                height: "200px",
                borderRadius: "10px",
                p: 2,

                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                  Unresolved
                </Typography>
                <Typography>Issues</Typography>
                <Typography sx={{ mt: 5, fontWeight: "700", fontSize: "30px" }}>
                  {total.unresolved}
                </Typography>
              </Box>
              <Unresolved />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ p: 2, width: { xs: "100%", md: "40%" } }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "auto",
                  borderRadius: "8px",
                  p: 5,
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ width: "90%" }}>
                  <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                    Reported issue trend
                  </Typography>
                  <Typography sx={{ fontWeight: "500", fontSize: "13px" }}>
                    (a line graph showing the number of reported issues over
                    time)
                  </Typography>
                  <Line data={lineData} />
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 2, width: { xs: "100%", md: "40%" } }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "auto",
                  borderRadius: "8px",
                  p: 5,
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ width: "90%" }}>
                  <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                    Total Reported Issues by Category
                  </Typography>
                  <Typography sx={{ fontWeight: "500", fontSize: "13px" }}>
                    a bar graph showing the total number of reported issues for
                    each category
                  </Typography>

                  <Box sx={{ width: "100%" }}>
                    <Bar data={barData} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
