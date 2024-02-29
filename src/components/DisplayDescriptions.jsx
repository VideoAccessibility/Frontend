import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { TextToSpeech } from "./";


const DisplayDescriptions = (props) => {
  const [desc, setDesc] = useState("");

  function handlePause(){
    console.log("yolo")
  }
  return (
    <div>
      <Box
        p={2}
        sx={{
          backgroundColor: "#1D5B79",
          borderRadius: "5px",
          marginBottom: "32px",
        }}
      >
        <Box p={1.5} borderRadius="5px" sx={{ backgroundColor: "white" }}>
          {props.descriptions.map((item) => {
            if (item.time_stamp === props.timeStamp)
            {
              return (
                <Typography variant="body1" sx={{ color: "#1D5B79" }}>
                  {item.descriptions}
                  {handlePause}
                  <hr />
                  <TextToSpeech text={item.descriptions} />
                </Typography>
              );
          }})}
        </Box>
      </Box>
    </div>
  );
};

export default DisplayDescriptions;
