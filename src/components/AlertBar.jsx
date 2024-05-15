import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const AlertBar = ({alertText, parentCallback}) => {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleAlertClose = () => {
    setAlertOpen(false);
    parentCallback();
  };

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={6000}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" onClose={handleAlertClose}>
        <AlertTitle>Error</AlertTitle>
        {alertText}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
