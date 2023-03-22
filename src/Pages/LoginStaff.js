import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { IconButton, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../Assets/Logo.png";
import { useNavigate, Navigate } from "react-router-dom";

import AuthService from "../auth_service";

import api from "../api/api";
import ExeatContext from "../ExeatContext";
const Login = () => {
  const { setSnackMessage, setIsSnackOpen } = useContext(ExeatContext);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    username: yup.string().required("User Number Is Required"),
    password: yup.string().required("Password Is Required"),
  });
  const { setWithExpiry, getCurrentAdmin } = AuthService;
  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });
  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setLoading(true);

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const body = data;

      const res = await api.post("/api/staff-login", body, config);

      const adminData = res.data.staff;
      setWithExpiry("user", adminData);
      if (adminData.role === "Staff") {
        navigate("/staff/patients");
      }
    } catch (err) {
      if (!err.response) {
        setLoading(false);

        setSnackMessage("Server Is Not Responding");
        setIsSnackOpen(true);
      } else if (err.response) {
        setSnackMessage(err.response.data.error);
        setIsSnackOpen(true);

        setLoading(false);
      } else if (err.request) {
        setSnackMessage(err.request);
        setIsSnackOpen(true);
        setLoading(false);
      } else {
        setSnackMessage(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {getCurrentAdmin() ? (
        getCurrentAdmin()?.role === "Staff" ? (
          <>
            <Navigate to="/staff" replace={true} />
          </>
        ) : (
          <>
            <Navigate to="/patient" replace={true} />
          </>
        )
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
            pl: { xs: "2rem", md: "10rem" },
            pr: { xs: "2rem", md: "10rem" },
          }}
        >
          <Box sx={{ width: "40%", display: { xs: "none", md: "block" } }}>
            {" "}
            <img src={logo} alt="logo" style={{ width: "70%" }} />
          </Box>

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "60%",
              },
              backgroundColor: "white",
              boxShadow: "1px 1px 15px 2px rgba(148, 147, 147, 0.404)",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ p: 4 }}>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "700",
                  fontSize: "30px",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Login To Your Account
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "13px",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Welcome back please enter your details
              </Typography>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ mb: 4 }}
                    label="User Number"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("username");
                    }}
                  />
                )}
              />{" "}
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="password"
                    label="Password"
                    sx={{ mb: 4 }}
                    type={values.showPassword ? "text" : "password"}
                    {...fields}
                    inputRef={ref}
                    fullWidth
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("password");
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleShowPassword}>
                          {values.showPassword === true ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
              <Box sx={{ textAlign: "center" }}>
                <LoadingButton
                  sx={{
                    mb: 2,
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#528265",
                    "&:hover": {
                      backgroundColor: "#528265",
                      opacity: "0.8",
                    },
                  }}
                  type="submit"
                  variant="contained"
                  loading={loading}
                  onClick={handleSubmit(onSubmit)}
                >
                  <span>Sign In</span>
                </LoadingButton>
              </Box>
              <Typography
                sx={{
                  color: "gray",
                  textDecoration: "underline",
                  fontSize: "12px",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Sign in as an Admin
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Login;
