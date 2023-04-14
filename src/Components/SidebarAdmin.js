import { Box, Button, Drawer, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

import { ReactComponent as Settings } from "../Assets/scgs/settings.svg";

import MainDrawerAdmin from "./MainDrawerAdmin";
import Navbar from "./Navbar";
import { ArrowDropDown, Person } from "@mui/icons-material";
import { ReactComponent as Logout } from "../Assets/scgs/logout.svg";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth_service";
import api from "../api/api";
const drawerWidth = 230;
const SidebarAdmin = (props) => {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  //   const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCurrentToken } = AuthService;
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const res = await api.post("/account/logout/", [], {
      headers: {
        Authorization: `token ${getCurrentToken()}`,
      },
    });
    if (res) {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      navigate("/login-admin");
    }
  };
  return (
    <>
      <Navbar setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
      <Box
        sx={{ textAlign: "right", backgroundColor: "#F1FFE7", pt: 5, pr: 5 }}
      >
        <Box>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                background: "#528265",
              },
            }}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            startIcon={<Person />}
            endIcon={<ArrowDropDown />}
          >
            Administrator
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {/* <MenuItem onClick={handleClose}>
              <CostAnalysis style={{ width: "30%", mr: 5 }} />
              <Typography>Costing</Typography>
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/admin/settings");
              }}
            >
              <Settings style={{ width: "30%", pr: 3 }} />
              <Typography> Settings</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}
            >
              <Logout style={{ width: "30%", pr: 3 }} />
              <Typography>Sign Out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },

          flexShrink: { md: 0 },
          backgroundColor: "white",
          zIndex: "1",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: "10",
              backgroundColor: "white",
              boxShadow: "2px 1px gray",
            },
          }}
        >
          <MainDrawerAdmin
            setMobileOpen={setMobileOpen}
            mobileOpen={mobileOpen}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "white",
            },
          }}
          open
        >
          <MainDrawerAdmin />
        </Drawer>
      </Box>
    </>
  );
};

export default SidebarAdmin;
