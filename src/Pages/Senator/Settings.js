import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
const Settings = () => {
  const schema = yup.object().shape({
    username: yup.string().required("User Number Is Required"),
    password: yup.string().required("Password Is Required"),
  });
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [values2, setValues2] = useState({
    password: "",
    showPassword: false,
  });
  const [values3, setValues3] = useState({
    password: "",
    showPassword: false,
  });

  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });
  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleShowPassword2 = () => {
    setValues2({ ...values2, showPassword: !values2.showPassword });
  };
  const handleShowPassword3 = () => {
    setValues3({ ...values3, showPassword: !values3.showPassword });
  };
  return (
    <>
      {" "}
      <Box
        sx={{
          backgroundColor: "#F1FFE7",

          height: "auto",
          ml: { xs: "0", md: "230px" },
        }}
      >
        <Box sx={{ padding: "4%", paddingTop: "6%" }}>
          <Box
            sx={{
              backgroundColor: "white",
              height: "70vh",
              borderRadius: "8px",
              p: 5,
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
              Change Password
            </Typography>
            <Box sx={{ height: "68vh", width: "100%", mt: 8 }}>
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
                    label="Current Password"
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

              <Controller
                name="new_password"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="new_password"
                    label="New Password"
                    sx={{ mb: 4 }}
                    type={values2.showPassword ? "text" : "password"}
                    {...fields}
                    inputRef={ref}
                    fullWidth
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("new_password");
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleShowPassword2}>
                          {values2.showPassword === true ? (
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

              <Controller
                name="confirm_password"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="confirm_password"
                    label="Confirm Password"
                    sx={{ mb: 4 }}
                    type={values3.showPassword ? "text" : "password"}
                    {...fields}
                    inputRef={ref}
                    fullWidth
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("confirm_password");
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleShowPassword3}>
                          {values3.showPassword === true ? (
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

              <Button variant="contained" color="primary">
                Change
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
