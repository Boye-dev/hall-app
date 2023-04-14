import { Print } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";

const PrintPreview = () => {
  const location = useLocation();
  const componentRef = useRef();
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
          Print Preview
        </Typography>

        <Box sx={{ pl: 10, pt: 5, pb: 10 }}>
          <Box
            ref={componentRef}
            sx={{
              width: { xs: "100%", md: "50%" },
              p: 5,
              height: "auto",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "25px",
              }}
            >
              BABCOCK UNIVERSITY
            </Typography>
            <Typography>121103, Ilishan-Remo, Ogun State. Nigeria</Typography>
            <Typography>Hall maintenance report</Typography>
            <Box sx={{ minHeight: "300px" }}>
              <table style={{ width: "80%", marginTop: "10%" }}>
                <tr>
                  <th>Issue</th>
                  <th>Category</th>
                  <th>Room</th>
                </tr>
                {location.state?.map((item) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{item.issue}</td>
                      <td style={{ textAlign: "center" }}>{item.category}</td>
                      <td style={{ textAlign: "center" }}>{item.room}</td>
                    </tr>
                  );
                })}
              </table>
            </Box>
            <Typography>___________________________</Typography>
            <Typography sx={{ color: "white" }}>hall admin name</Typography>
            <Typography sx={{ pl: 7 }}>Hall Adminstrator</Typography>
          </Box>
          <ReactToPrint
            trigger={() => (
              <Button
                variant="contained"
                startIcon={<Print />}
                sx={{
                  backgroundColor: "#528265",
                  mt: 4,
                  "&:hover": {
                    background: "#528265",
                  },
                }}
              >
                Print
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Box>
      </Box>
    </>
  );
};

export default PrintPreview;
