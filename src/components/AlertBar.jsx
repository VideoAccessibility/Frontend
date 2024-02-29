import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const AlertBar = () => {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={6000}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" onClose={handleAlertClose}>
        <AlertTitle>Authentication Error</AlertTitle>
        You need to be logged in to upload a video.
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
