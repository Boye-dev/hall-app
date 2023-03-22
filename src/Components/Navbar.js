import { Box, Typography, IconButton } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth_service";
import logo from "../Assets/Logo.png";

const Navbar = ({ setMobileOpen, mobileOpen }) => {
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { logout } = AuthService;

  return (
    <>
      <Box sx={{ position: "sticky", top: "0", zIndex: "200" }}>
        <Box
          sx={{
            // width: { md: `calc(100% - ${240}px)` },
            // ml: { md: `${240}px` },

            height: "80px",
            zIndex: "200",
            backgroundColor: "white",

            display: { xs: "flex", md: "none" },
            justifyContent: { xs: "", md: "flex-end" },
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 5, display: { md: "none" }, color: "black" }}
          >
            <MenuIcon color="black" />
          </IconButton>
          <Box sx={{ width: "30%", height: "50px" }}>
            <img src={logo} style={{ width: "20%" }} alt="logo" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
