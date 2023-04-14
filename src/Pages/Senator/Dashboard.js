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

  const [total, setTotal] = useState([]);

  const [totalLoading, setTotalLoading] = useState(true);

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
    fetchTotal();
  }, []);
  return (
    <>
      {totalLoading ? (
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

            minHeight: "100vh",
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
                m: 1,
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
                m: 1,
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
        </Box>
      )}
    </>
  );
};

export default Dashboard;
