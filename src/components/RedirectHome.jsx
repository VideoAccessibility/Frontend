import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RedirectHome = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRedirect = () => {
    setOpen(false);
    // Redirect to the homepage
    navigate('/');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open redirect dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Success of upload"
        aria-describedby="The video has been uploaded, this modal will redirect to the homepage"
      >
        <DialogTitle id="alert-dialog-title">
          {"Success!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your video has been uploaded on the homepage, would you like to be redirected to the home page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{
                    backgroundColor: "secondary.main",
                    color: "white",
                  }}
                  
                  className="category-btn"onClick={handleClose}>No</Button>
          <Button sx={{
                    backgroundColor: "secondary.main",
                    color: "white",
                  }}
                  
                  className="category-btn"
                  onClick={handleRedirect} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default RedirectHome;
