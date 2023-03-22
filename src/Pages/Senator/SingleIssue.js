import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SingleIssue = () => {
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
        <Box sx={{ padding: "4%", paddingTop: "6%" }}>
          <Box
            sx={{
              backgroundColor: "white",
              height: "auto",
              borderRadius: "8px",
              p: 5,
            }}
          >
            <Typography
              sx={{ fontWeight: "700", fontSize: "15px", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowBack /> <Box sx={{ ml: 1 }}>Go Back</Box>
              </Box>
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                mt: 5,
                fontWeight: "700",
                borderBottom: "1px solid black",
              }}
            >
              <Typography sx={{ fontWeight: "700" }}>Bad Locker</Typography>{" "}
              <Typography sx={{ fontWeight: "700" }}>Room Number: </Typography>
            </Box>{" "}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                mt: 2,
                fontWeight: "700",
                borderBottom: "1px solid black",
              }}
            >
              <Typography sx={{ fontWeight: "700" }}>Category: </Typography>
            </Box>
            <Box
              sx={{
                fontWeight: "700",
                p: 1,
              }}
            >
              <Typography sx={{ fontWeight: "700" }}>Description </Typography>
              <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                <Typography>
                  Scams can take many different forms, but they are all intended
                  to steal your money. They accomplish this by coercing you into
                  disclosing personal information, stealing your data, or even
                  deceiving you into voluntarily turning over the money. It's
                  critical to learn how to spot a scam so you can defend
                  yourself from fraudsters. Scammers and fraudsters may knock on
                  your door, send you an unexpected email, or telephone you
                  without warning. (Kim et al, 2019). Scammers now have more
                  options to target you and steal your information through the
                  internet and developments in digital communications. It's
                  likely that you've encountered the most typical scam: spam
                  emails claiming to be from your bank or telling you that
                  you're going to get some money. Others are significantly more
                  complex, despite the fact that certain email scams might be
                  rather simple to recognize and prevent (Salahdine & Kaabouch,
                  2019) . The Internet is the fastest growing infrastructure in
                  everyday life and the latest technologies are changing the
                  face of mankind. But due to thes
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ mt: 10, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>
                Status: <span style={{ fontWeight: "700" }}>Unresolved</span>
              </Typography>
              <Button color="error" variant="contained">
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleIssue;
