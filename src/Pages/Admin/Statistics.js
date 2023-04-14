import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import api from "../../api/api";
import AuthService from "../../auth_service";
import "chart.js/auto";

const Statistics = () => {
  const { getCurrentToken } = AuthService;
  const [line, setLine] = useState({});
  const [bar, setBar] = useState([]);
  const [pie, setPie] = useState([]);
  const [barLoading, setBarLoading] = useState(true);
  const [pieLoading, setPieLoading] = useState(true);
  const [lineLoading, setLineLoading] = useState(true);

  const lineData = {
    labels: Object.keys(line),
    datasets: [
      {
        label: "Month",
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
  const pieData = {
    labels: Object.keys(pie),
    datasets: [
      {
        data: Object.values(pie),
        backgroundColor: [
          "#061b64",
          "#7a0c2e",
          "yellow",
          "green",
          "red",
          "purple",
          "blue",
          "#061b34",
          "#7a1c2e",
          "pink",
        ],
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
  const fetchPie = async () => {
    try {
      const response = await api.get("/statistics/price-per-category/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setPie(response.data);
      setPieLoading(false);
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
    fetchPie();
  }, []);
  return (
    <>
      {lineLoading || barLoading || pieLoading ? (
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
            Statistics
          </Typography>
          <Box sx={{ p: 8 }}>
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
              <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                  Reported issue trend
                </Typography>
                <Typography sx={{ fontWeight: "500", fontSize: "13px" }}>
                  (a line graph showing the number of reported issues over time)
                </Typography>
                <Line data={lineData} options={{}} />
              </Box>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",

                  width: { xs: "100%", md: "40%" },
                  height: "auto",
                }}
              >
                <Box sx={{ p: 4 }}>
                  <Typography y sx={{ fontWeight: "700", fontSize: "15px" }}>
                    Analysis
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Typography>
                      Month with the highest number of issues
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        width: "100px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography>
                        {Object.keys(line).reduce((a, b) =>
                          line[a] > line[b] ? a : b
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Typography>
                      Month with the lowest number of issues
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        width: "100px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography>
                        {Object.keys(line).reduce((a, b) =>
                          line[a] < line[b] ? a : b
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Typography>Total number of issues reported</Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        width: "100px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography>
                        {Object.values(line).reduce((a, b) => a + b, 0)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Typography>Average number of issues</Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        width: "100px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography>
                        {Object.values(line).reduce((a, b) => a + b, 0) / 12}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 8 }}>
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
              <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                  Total Reported Issues by Category
                </Typography>
                <Typography sx={{ fontWeight: "500", fontSize: "13px" }}>
                  a bar graph showing the total number of reported issues for
                  each category
                </Typography>

                <Box sx={{ width: "100%" }}>
                  <Bar data={barData} options={{}} />
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  width: { xs: "100%", md: "40%" },
                  height: "auto",
                }}
              >
                <Box sx={{ p: 4 }}>
                  <Typography y sx={{ fontWeight: "700", fontSize: "15px" }}>
                    Analysis
                  </Typography>
                  {bar.map((item) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 3,
                        }}
                      >
                        <Typography>
                          Total number of {item.name} issues
                        </Typography>
                        <Box
                          sx={{
                            backgroundColor: "white",
                            width: "100px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                          }}
                        >
                          <Typography>{item.amount_issues}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Typography>
                      Category with the most number of issues
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        width: "100px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography>
                        {
                          bar.reduce((a, b) =>
                            a.amount_issues > b.amount_issues ? a : b
                          ).name
                        }
                      </Typography>
                    </Box>
                  </Box>{" "}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Typography>
                      Category with the most least of issues
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        width: "100px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography>
                        {
                          bar.reduce((a, b) =>
                            a.amount_issues < b.amount_issues ? a : b
                          ).name
                        }
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 8 }}>
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
              <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                  Total Amount spent by Category
                </Typography>
                <Typography sx={{ fontWeight: "500", fontSize: "13px" }}>
                  a pie chart showing the total cost spent for rectifying issues
                  in each category
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{}}>
                    <Doughnut data={pieData} options={{}} />
                  </Box>
                  <Typography>
                    Total Spent: ₦
                    {Object.values(pie).reduce((acc, value) => acc + value, 0)}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: "8px",
                      mb: 3,
                      width: { xs: "100%", md: "40%" },
                      height: "auto",
                      mr: 1,
                    }}
                  ></Box>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  width: { xs: "100%", md: "40%" },
                  height: "auto",
                }}
              >
                <Box sx={{ p: 4 }}>
                  <Typography y sx={{ fontWeight: "700", fontSize: "15px" }}>
                    Analysis
                  </Typography>
                  {Object.entries(pie).map(([key, value]) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography>Total amount spent on {key}</Typography>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          width: "100px",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                        }}
                      >
                        <Typography> ₦{value}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Statistics;
