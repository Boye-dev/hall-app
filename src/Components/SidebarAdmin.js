import { Box, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import MainDrawerAdmin from "./MainDrawerAdmin";
import Navbar from "./Navbar";

const drawerWidth = 230;
const SidebarAdmin = (props) => {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  //   const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Navbar setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />

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
