import { createContext, useEffect, useRef, useState } from "react";
import { Snackbar } from "@mui/material";
import AuthService from "./auth_service";
const ExeatContext = createContext();
export const ExeatProvider = ({ children }) => {
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackColor, setSnackColor] = useState();
  const handleClose = () => {
    setIsSnackOpen(false);
  };
  const [convoData, setConvoData] = useState(true);

  const { getCurrentUser } = AuthService;

  const currenUser = getCurrentUser();

  return (
    <ExeatContext.Provider
      value={{
        setIsSnackOpen,
        setSnackMessage,
        snackColor,
        setSnackColor,
        convoData,
        setConvoData,
      }}
    >
      {isSnackOpen && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isSnackOpen}
          onClose={handleClose}
          autoHideDuration={3000}
          message={`${snackMessage}`}
          key="topcenter"
          sx={{
            color: "black !important",
            "& .MuiSnackbarContent-root": {
              backgroundColor: `${snackColor ? `${snackColor}` : "darkred"}`,
            },
          }}
        />
      )}
      {children}
    </ExeatContext.Provider>
  );
};

export default ExeatContext;
