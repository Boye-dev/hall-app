import React from "react";
import { Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../Assets/Logo.png";
import { ReactComponent as Reported } from "../Assets/scgs/reported.svg";
import { ReactComponent as Unresolved } from "../Assets/scgs/unresolved.svg";
import { ReactComponent as Pending } from "../Assets/scgs/pending.svg";
import { ReactComponent as Resolved } from "../Assets/scgs/resolved.svg";
import { ReactComponent as Compile } from "../Assets/scgs/compile.svg";
import { ReactComponent as CostAnalysis } from "../Assets/scgs/cost-analysis.svg";
import { ReactComponent as History } from "../Assets/scgs/history.svg";
import { ReactComponent as Settings } from "../Assets/scgs/settings.svg";
import { ReactComponent as Logout } from "../Assets/scgs/logout.svg";

const MainDrawerAdmin = ({ setMobileOpen, mobileOpen }) => {
  const side = [
    {
      name: "Reported",
      icon: <Reported />,
    },
    {
      name: "Unresolved",
      icon: <Unresolved />,
    },
    {
      name: "Pending",
      icon: <Pending />,
    },
    {
      name: "Resolved",
      icon: <Resolved />,
    },
    {
      name: "Compile",
      icon: <Compile />,
    },
    {
      name: "Costing",
      icon: <CostAnalysis />,
    },
    {
      name: "History",
      icon: <History />,
    },
  ];
  const handleClick = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          mb: 5,
          p: 1,
          borderBottom: "1px solid gray",
          outline: "none",
        }}
      >
        <img src={logo} style={{ width: "30%" }} alt="logo" />
      </Box>
      <Box>
        {side.map((text, index) => (
          <NavLink
            key={index}
            to={`${text.name.toLowerCase().replace(/ /g, "-")}`}
            style={({ isActive }) =>
              isActive
                ? {
                    display: "flex",
                    textDecoration: "none",
                    backgroundColor: "#528265",

                    textAlign: "center",
                    "&:hover": {
                      background: "#528265",
                    },
                  }
                : {
                    textDecoration: "none",
                    display: "flex",
                    marginTop: "7px",
                    marginBottom: "7px",
                    "&:hover": {
                      background: "gray",
                    },
                  }
            }
            onClick={() => handleClick()}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                paddingTop: "3%",
                pl: 5,

                paddingBottom: "3%",
                "&:hover": {
                  background: "gray",
                },
              }}
            >
              <Typography
                sx={{
                  pr: 2,
                }}
              >
                {text.icon}
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                {text.name}
              </Typography>
            </Box>
          </NavLink>
        ))}
        <Box sx={{ mt: 10 }}>
          <NavLink
            to={`settings`}
            style={({ isActive }) =>
              isActive
                ? {
                    display: "flex",
                    textDecoration: "none",
                    backgroundColor: "gray",

                    textAlign: "center",
                    "&:hover": {
                      background: "gray",
                    },
                  }
                : {
                    textDecoration: "none",
                    display: "flex",
                    marginTop: "7px",
                    marginBottom: "7px",
                    "&:hover": {
                      background: "gray",
                    },
                  }
            }
            onClick={() => handleClick()}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                paddingTop: "3%",
                pl: 5,

                paddingBottom: "3%",
                "&:hover": {
                  background: "gray",
                },
              }}
            >
              <Typography
                sx={{
                  pr: 2,
                }}
              >
                <Settings />
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                Settings
              </Typography>
            </Box>
          </NavLink>{" "}
          <NavLink
            style={{
              textDecoration: "none",
              display: "flex",
              marginTop: "7px",
              marginBottom: "7px",
              "&:hover": {
                background: "gray",
              },
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                paddingTop: "3%",
                pl: 5,

                paddingBottom: "3%",
                "&:hover": {
                  background: "gray",
                },
              }}
            >
              <Typography
                sx={{
                  pr: 2,
                }}
              >
                <Logout />
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                Logout
              </Typography>
            </Box>
          </NavLink>
        </Box>
      </Box>
    </>
  );
};

export default MainDrawerAdmin;
