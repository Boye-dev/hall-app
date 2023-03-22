import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Electrical } from "../../Assets/scgs/electrical.svg";
import { ReactComponent as Plumbing } from "../../Assets/scgs/plumbing.svg";
import { ReactComponent as Carpentry } from "../../Assets/scgs/carpentry.svg";
import { ReactComponent as Aluminium } from "../../Assets/scgs/aluminium.svg";

const Costing = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F1FFE7",

          height: "100vh",
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
            >
              Set prices for issues
            </Typography>

            {[
              { name: "Electrical", icon: <Electrical /> },
              { name: "Plumbing", icon: <Plumbing /> },
              { name: "Carpentry", icon: <Carpentry /> },
              { name: "Aluminium", icon: <Aluminium /> },
            ].map((item) => {
              return (
                <Box
                  sx={{
                    p: 2,
                    width: { xs: "100%", md: "250px" },
                    mt: 4,
                    border: "1px solid black",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item.icon}
                        <Box sx={{ ml: 1 }}>{item.name} </Box>
                      </Box>
                      <ArrowForwardIos />
                    </Box>
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Costing;
