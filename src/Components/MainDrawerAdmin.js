import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
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
import { ReactComponent as Dashboard } from "../Assets/scgs/dashboard.svg";
import { ReactComponent as Statistics } from "../Assets/scgs/statistics.svg";
import { ReactComponent as Categories } from "../Assets/scgs/categories.svg";
import { ReactComponent as Users } from "../Assets/scgs/users.svg";
import api from "../api/api";
import AuthService from "../auth_service";

const MainDrawerAdmin = ({ setMobileOpen, mobileOpen }) => {
  const { getCurrentToken } = AuthService;
  const navigate = useNavigate();
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
      name: "Resolved",
      icon: <Resolved />,
    },
    {
      name: "Compile",
      icon: <Compile />,
    },
  ];
  const handleClick = () => {
    mobileOpen && setMobileOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          mb: 2,
          p: 1,
          borderBottom: "1px solid gray",
          outline: "none",
        }}
      >
        <img src={logo} style={{ width: "30%" }} alt="logo" />
      </Box>
      <Box>
        <NavLink
          to={`dashboard`}
          style={({ isActive }) =>
            isActive
              ? {
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  backgroundColor: "#528265",
                  margin: "4%  8%",
                  borderRadius: "10px",
                  textAlign: "center",
                  "&:hover": {
                    background: "#528265",
                  },
                }
              : {
                  textDecoration: "none",
                  display: "flex",
                  marginTop: "7px",
                  margin: "4% 8%",
                  borderRadius: "10px",
                  marginBottom: "7px",
                  background: "#F5F5F5",
                  "&:hover": {
                    background: "#528265",
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
              borderRadius: "10px",
              paddingBottom: "3%",
              "&:hover": {
                background: "#528265",
              },
            }}
          >
            <Typography
              sx={{
                pr: 2,
              }}
            >
              <Dashboard />
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Dashboard
            </Typography>
          </Box>
        </NavLink>
        <Box sx={{ padding: "0 8%" }}>
          <Typography sx={{ fontSize: "13px", color: "black" }}>
            Reports
          </Typography>
          <Divider />
        </Box>
        {side.map((text, index) => (
          <NavLink
            key={index}
            to={`${text.name.toLowerCase().replace(/ /g, "-")}`}
            style={({ isActive }) =>
              isActive
                ? {
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    backgroundColor: "#528265",
                    margin: "4%  8%",
                    borderRadius: "10px",
                    textAlign: "center",
                    "&:hover": {
                      background: "#528265",
                    },
                  }
                : {
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "7px",
                    margin: "4% 8%",
                    borderRadius: "10px",
                    marginBottom: "7px",
                    background: "#F5F5F5",
                    "&:hover": {
                      background: "#528265",
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
                borderRadius: "10px",
                paddingBottom: "3%",
                "&:hover": {
                  background: "#528265",
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
        <Box sx={{ padding: "0 8%" }}>
          <Typography sx={{ fontSize: "13px", color: "black" }}>
            Manage
          </Typography>
          <Divider />
        </Box>
        <NavLink
          to={`categories`}
          style={({ isActive }) =>
            isActive
              ? {
                  display: "flex",
                  textDecoration: "none",
                  backgroundColor: "#528265",
                  margin: "4%  8%",
                  borderRadius: "10px",
                  textAlign: "center",
                  "&:hover": {
                    background: "#528265",
                  },
                }
              : {
                  textDecoration: "none",
                  display: "flex",
                  marginTop: "7px",
                  margin: "4% 8%",
                  borderRadius: "10px",
                  marginBottom: "7px",
                  background: "#F5F5F5",
                  "&:hover": {
                    background: "#528265",
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
              borderRadius: "10px",
              paddingBottom: "3%",
              "&:hover": {
                background: "#528265",
              },
            }}
          >
            <Typography
              sx={{
                pr: 2,
              }}
            >
              <Categories />
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Categories
            </Typography>
          </Box>
        </NavLink>
        <NavLink
          to={`users`}
          style={({ isActive }) =>
            isActive
              ? {
                  display: "flex",
                  textDecoration: "none",
                  backgroundColor: "#528265",
                  margin: "4%  8%",
                  borderRadius: "10px",
                  textAlign: "center",
                  "&:hover": {
                    background: "#528265",
                  },
                }
              : {
                  textDecoration: "none",
                  display: "flex",
                  marginTop: "7px",
                  margin: "4% 8%",
                  borderRadius: "10px",
                  marginBottom: "7px",
                  background: "#F5F5F5",
                  "&:hover": {
                    background: "#528265",
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
              borderRadius: "10px",
              paddingBottom: "3%",
              "&:hover": {
                background: "#528265",
              },
            }}
          >
            <Typography
              sx={{
                pr: 2,
              }}
            >
              <Users />
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Users
            </Typography>
          </Box>
        </NavLink>
        <Box sx={{ padding: "0 8%" }}>
          <Typography sx={{ fontSize: "13px", color: "black" }}>
            Analytics
          </Typography>
          <Divider />
        </Box>
        <NavLink
          to={`statistics`}
          style={({ isActive }) =>
            isActive
              ? {
                  display: "flex",
                  textDecoration: "none",
                  backgroundColor: "#528265",
                  margin: "4%  8%",
                  borderRadius: "10px",
                  textAlign: "center",
                  "&:hover": {
                    background: "#528265",
                  },
                }
              : {
                  textDecoration: "none",
                  display: "flex",
                  marginTop: "7px",
                  margin: "4% 8%",
                  borderRadius: "10px",
                  marginBottom: "7px",
                  background: "#F5F5F5",
                  "&:hover": {
                    background: "#528265",
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
              borderRadius: "10px",
              paddingBottom: "3%",
              "&:hover": {
                background: "#528265",
              },
            }}
          >
            <Typography
              sx={{
                pr: 2,
              }}
            >
              <Statistics />
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Statistics
            </Typography>
          </Box>
        </NavLink>
        <NavLink
          to={`history`}
          style={({ isActive }) =>
            isActive
              ? {
                  display: "flex",
                  textDecoration: "none",
                  backgroundColor: "#528265",
                  margin: "4%  8%",
                  borderRadius: "10px",
                  textAlign: "center",
                  "&:hover": {
                    background: "#528265",
                  },
                }
              : {
                  textDecoration: "none",
                  display: "flex",
                  marginTop: "7px",
                  margin: "4% 8%",
                  borderRadius: "10px",
                  marginBottom: "7px",
                  background: "#F5F5F5",
                  "&:hover": {
                    background: "#528265",
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
              borderRadius: "10px",
              paddingBottom: "3%",
              "&:hover": {
                background: "#528265",
              },
            }}
          >
            <Typography
              sx={{
                pr: 2,
              }}
            >
              <History />
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              History
            </Typography>
          </Box>
        </NavLink>
      </Box>
    </>
  );
};

export default MainDrawerAdmin;
