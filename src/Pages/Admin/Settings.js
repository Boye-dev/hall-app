import { Key, Password } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F1FFE7",

          height: "auto",
          ml: { xs: "0", md: "230px" },
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "25px",
            cursor: "pointer",
            pl: 10,
            pt: 5,
          }}
        >
          Settings
        </Typography>
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",

              "&:hover": {
                background: "#528265",
              },
            }}
            startIcon={<Key size={15} />}
            onClick={() => {
              navigate("/admin/change-password");
            }}
          >
            Change Password{" "}
          </Button>
          <Box sx={{ padding: "1%", paddingTop: "6%" }}>
            <Box
              sx={{
                backgroundColor: "#528265",
                height: "auto",
                borderRadius: "8px",
                p: 5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "20px",

                  color: "white",
                }}
              >
                About HallTrack
              </Typography>
              <Typography sx={{ color: "white", pt: 3 }}>
                Etiam posuere vitae augue id rhoncus. Cras accumsan ex sit amet
                tristique volutpat. Interdum et malesuada fames ac ante ipsum
                primis in faucibus. In tincidunt, dui sit amet vulputate
                interdum, massa risus imperdiet nibh, ut commodo metus nisi ac
                dolor. Curabitur feugiat leo vel lorem aliquam elementum. Ut ut
                elementum neque. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames ac turpis egestas. Nunc posuere
                consequat ante eu dapibus. Phasellus efficitur turpis non mauris
                interdum blandit. Phasellus pharetra scelerisque quam, sed
                maximus felis pulvinar nec. Nullam arcu felis, fringilla ac
                bibendum et, bibendum sed urna. Praesent lobortis quam eu
                pellentesque pellentesque. Ut sit amet mattis diam. Suspendisse
                erat ex, eleifend vitae sodales sit amet, gravida eleifend mi.
                Pellentesque justo lorem, aliquam sit amet dolor ac, faucibus
                viverra nisi. Fusce ut justo metus. Etiam posuere vitae augue id
                rhoncus. Cras accumsan ex sit amet tristique volutpat. Interdum
                et malesuada fames ac ante ipsum primis in faucibus. In
                tincidunt, dui sit amet vulputate interdum, massa risus
                imperdiet nibh, ut commodo metus nisi ac dolor. Curabitur
                feugiat leo vel lorem aliquam elementum. Ut ut elementum neque.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Nunc posuere consequat ante
                eu dapibus. Phasellus efficitur turpis non mauris interdum
                blandit. Phasellus pharetra scelerisque quam, sed maximus felis
                pulvinar nec. Nullam arcu felis, fringilla ac bibendum et,
                bibendum sed urna. Praesent lobortis quam eu pellentesque
                pellentesque. Ut sit amet mattis diam. Suspendisse erat ex,
                eleifend vitae sodales sit amet, gravida eleifend mi.
                Pellentesque justo lorem, aliquam sit amet dolor ac, faucibus
                viverra nisi. Fusce ut justo metus.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
