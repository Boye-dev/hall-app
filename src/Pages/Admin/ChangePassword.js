import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../../api/api";
import AuthService from "../../auth_service";
import ExeatContext from "../../ExeatContext";
const ChangePassword = () => {
  const schema = yup.object().shape({
    new_password: yup.string().required("New Password Is Required"),
    old_password: yup.string().required("Old Password Is Required"),
    confirm_password: yup.string().required("Confirm Password Is Required"),
  });
  const { getCurrentToken } = AuthService;
  const { setSnackMessage, setIsSnackOpen, setSnackColor } =
    useContext(ExeatContext);

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

  const { handleSubmit, trigger, control, reset } = useForm({
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
  const [create, setCreate] = useState(false);
  const onSubmit = async (data) => {
    setCreate(true);
    try {
      const response = await api.put("/account/change-password/", data, {
        headers: {
          Authorization: `token ${getCurrentToken()}`,
        },
      });

      if (response) {
        setIsSnackOpen(true);
        setSnackMessage("Updated Succesfully");
        setSnackColor("green");

        reset();
        setCreate(false);
      }
    } catch (error) {
      if (error.response) {
        setCreate(false);
        setSnackMessage(error.response.data.non_field_errors);
        setIsSnackOpen(true);

        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
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
                name="old_password"
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

              <LoadingButton
                variant="contained"
                color="primary"
                loading={create}
                onClick={handleSubmit(onSubmit)}
              >
                Change
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
