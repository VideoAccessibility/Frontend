import React from 'react';
import {Button,  DialogContent, DialogContentText, DialogActions} from "@mui/material";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const AskAI = () => {
  return (
    <div>

        <DialogContent>
        <KeyboardVoiceIcon
            sx={{ fontSize: "70px", backgroundColor:"#1D5B79", color: "#EF6262", ml: "5px", borderRadius:"100%" , padding:"20px", margin: "20px"}}
        />
          <DialogContentText id="alert-dialog-description" justifyContent={"center"}>
            Ask your questions regarding the frame here
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button >Yes</Button>
          <Button>
            No
          </Button>
        </DialogActions>
    </div>
  );
}

export default AskAI