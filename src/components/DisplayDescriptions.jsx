import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import Divider from '@mui/material/Divider';

import { TextToSpeech } from "./";


const DisplayDescriptions = ({description, parentCallback, cIndex, pIndex}) => {
  const [desc, setDesc] = useState("");
  function handlePause(){
    console.log("yolo")
  }

  function handleCallback(playedIndex){
   parentCallback(playedIndex);
  }
  return (
    <div>
        <Box p={2} borderRadius="5px" sx={{ backgroundColor: "white" }} boxShadow={3}>
                <Typography variant="body1" marginBottom={2}>
                  {description.descriptions}
                </Typography>
                <Divider aria-hidden="true"/>
                  <TextToSpeech text={description.descriptions}
                  isPlayed={true}
                  parentCallback={handleCallback}
                  cIndex = {cIndex}
                  pIndex = {pIndex} />
        </Box>
    </div>
  );
};

export default DisplayDescriptions;
