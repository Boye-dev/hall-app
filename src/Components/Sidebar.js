import {
  ArrowDropDown,
  Chat,
  Close,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import api from "../api/api";
import AuthService from "../auth_service";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import MainDrawer from "./MainDrawer";
import Messages from "./Messages";
import Navbar from "./Navbar";
import { yupResolver } from "@hookform/resolvers/yup";
import ExeatContext from "../ExeatContext";

const drawerWidth = 230;
const Sidebar = (props) => {
  const [openReport, setOpenReport] = useState(false);
  const [categories, setCategories] = useState([]);
  const [snapshot, setSnapshot] = useState();
  const [rooms, setRooms] = useState([]);

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { getCurrentToken } = AuthService;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const fetchReports = async () => {
    try {
      const response = await api.get("/reports/categories/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setCategories(response.data.results);
    } catch (error) {
      if (error.response) {
        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
  };
  const onImageChange1 = (e) => {
    const imageFile = e.target.files[0];
    setSnapshot(imageFile);
  };
  const fetchRooms = async () => {
    try {
      const response = await api.get("/reports/fetch-rooms/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setRooms(response.data.results);
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
    fetchRooms();
  }, [openReport]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [create, setCreate] = useState(false);

  const { setIsSnackOpen, setSnackMessage, setSnackColor } =
    useContext(ExeatContext);
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
      navigate("/login");
    }
  };
  const schema = yup.object().shape({
    issue: yup.string().required("Issue Is Required"),
    category: yup.string().required("Category Is Required"),
    room: yup.string().required("Room Is Required"),
    description: yup.string().required("Description Is Required"),
  });
  const { handleSubmit, trigger, control, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setCreate(true);
    let formData = new FormData();

    formData.append("issue", data.issue);
    formData.append("category", data.category);
    formData.append("room", data.room);
    formData.append("description", data.description);
    snapshot && formData.append("snapshot", snapshot);

    try {
      const response = await api.post("/reports/add/", formData, {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) {
        setIsSnackOpen(true);
        setSnackMessage("Created Succesfully");
        setSnackColor("green");
        reset();
        setCreate(false);
        setOpenReport(false);
        setSnapshot();
        document.location.reload();
        // navigate("/senator/reported");
      }
    } catch (error) {
      if (error.response) {
        setCreate(false);

        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
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
            variant="contained"
            sx={{
              backgroundColor: "#528265",
              color: "white",
              mr: 2,
              "&:hover": {
                background: "#528265",
              },
            }}
            onClick={() => setOpenReport(true)}
          >
            Report An Issue
          </Button>
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
            Senator
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
                navigate("/senator/settings");
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
          <MainDrawer setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
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
          <MainDrawer />
        </Drawer>
      </Box>

      <Drawer
        anchor="right"
        open={openReport}
        onClose={() => setOpenReport(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: "700" }}>Report New Issue</Typography>
          <Close
            sx={{ cursor: "pointer" }}
            onClick={() => setOpenReport(false)}
          />
        </Box>
        <Divider />
        <Box sx={{ width: "350px", p: 2 }}>
          <Controller
            name="room"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="room">Select Room</InputLabel>
                <Select
                  labelId="room"
                  id="room"
                  label="Select Room"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                  onKeyUp={() => {
                    trigger("room");
                  }}
                >
                  {rooms.map((item) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
                <Typography sx={{ color: "#DB2F2F", fontSize: "12px" }}>
                  {error?.message}
                </Typography>
              </FormControl>
            )}
          />
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="room">Select Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  label="Select Category"
                  fullWidth
                  {...fields}
                  inputRef={ref}
                  error={Boolean(error?.message)}
                  onKeyUp={() => {
                    trigger("category");
                  }}
                >
                  {categories.map((item) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
                <Typography sx={{ color: "#DB2F2F", fontSize: "12px" }}>
                  {error?.message}
                </Typography>
              </FormControl>
            )}
          />
          <Controller
            name="issue"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Issue"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("issue");
                }}
              />
            )}
          />{" "}
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Description"
                fullWidth
                multiline
                rows={10}
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("description");
                }}
              />
            )}
          />
          <input type="file" id="snapshot" onChange={onImageChange1} />
          <Box sx={{ mt: 5 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={create}
              startIcon={create ? <CircularProgress size={15} /> : ""}
              onClick={handleSubmit(onSubmit)}
            >
              Report
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
