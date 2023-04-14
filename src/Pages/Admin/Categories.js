import { Add, ArrowForwardIos, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../api/api";
import AuthService from "../../auth_service";
import ExeatContext from "../../ExeatContext";

const Categories = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Name Is Required"),
    start_price: yup.string().required("Start Price Is Required"),
    last_price: yup.string().required("Last Price Is Required"),
  });
  const { handleSubmit, trigger, control, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [create, setCreate] = useState(false);
  const { getCurrentToken } = AuthService;
  const [refetch, setRefectch] = useState(false);

  const { setIsSnackOpen, setSnackMessage, setSnackColor } =
    useContext(ExeatContext);
  const onSubmit = async (data) => {
    setCreate(true);
    try {
      const response = await api.post("/reports/add-category/", data, {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) {
        setIsSnackOpen(true);
        setSnackMessage("Created Succesfully");
        setSnackColor("green");
        setOpenCategory(false);
        reset();
        setCreate(false);
        setLoading(true);
        setRefectch(!refetch);
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
  const fetchReports = async () => {
    try {
      const response = await api.get("/reports/categories/", {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) setCategories(response.data.results);
      setLoading(false);
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
  }, [refetch]);
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ fontWeight: "700", fontSize: "15px", cursor: "pointer" }}
              >
                Categories
              </Typography>
              <Button
                variant="contained"
                onClick={() => setOpenCategory(true)}
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#528265",

                  "&:hover": {
                    background: "#528265",
                  },
                }}
              >
                Create Category
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <CircularProgress sx={{ color: "green" }} />
                </Box>
              ) : (
                categories.map((item) => {
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
                            <Box sx={{ ml: 1 }}>{item.name} </Box>
                          </Box>
                          <ArrowForwardIos />
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Start Price: {item.start_price}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Last Price: {item.last_price}
                        </Typography>
                      </Typography>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={openCategory}
        onClose={() => setOpenCategory(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: "700" }}>Create Category</Typography>
          <Close
            sx={{ cursor: "pointer" }}
            onClick={() => setOpenCategory(false)}
          />
        </Box>
        <Divider />
        <Box sx={{ width: "350px", p: 2 }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Name"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
            )}
          />
          <Controller
            name="start_price"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Start Price"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("start_price");
                }}
              />
            )}
          />{" "}
          <Controller
            name="last_price"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                sx={{ mt: 2 }}
                label="Last Price"
                fullWidth
                {...fields}
                inputRef={ref}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onKeyUp={() => {
                  trigger("last_price");
                }}
              />
            )}
          />
          <Box sx={{ mt: 5 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={create}
              startIcon={create && <CircularProgress size={15} />}
              onClick={handleSubmit(onSubmit)}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Categories;
