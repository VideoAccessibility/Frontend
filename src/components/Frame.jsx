import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper, Input, Button } from "@mui/material";
import { Tag } from "./";
import axios from "axios";
import Cookies from "js-cookie";

const Frame = (props) => {
  const [description, setDescription] = useState("");
  function handleChange(event) {
    const value = event.target.value;
    console.log("this is my target", event.target.value);
    setDescription(value);
  }

  function handleSave() {
    const token = Cookies.get("jwtToken");

    // Define the API endpoint where you want to send the POST request
    const apiUrl = "https://vidscribe.org/descriptions/";

    const postData = {
        "video_id": props.id,
        "time_stamp": props.timeStamp,
        "descriptions": description,
        "jwt":token
      };

    axios
      .post(apiUrl, postData)
      .then((response) => {
        // Handle the successful response
        console.log("Response:", response.data);
        props.parentCallback()
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
      });
  }
  console.log("this is my desc", description);
  return (
    <Paper elevation={2}>
      <Box
        p={2}
        sx={{
          backgroundColor: "primary.light",
          borderRadius: "5px",
          marginBottom: "32px",
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* Displays Scene number */}
          <Grid item xs={2}>
            <Typography variant="h6" sx={{ color: "primary.dark" }}>
              Scene {props.sceneNum}
            </Typography>
          </Grid>
          {/* Displays time stamp */}
          <Grid item xs={1}>
            <Typography
              fontSize="1rem"
              color="white"
              backgroundColor="#EF6262"
              padding="3px"
              borderRadius="5px"
            >
              {props.timeStamp}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                sx={{
                  backgroundColor: "#1D5B79",
                  color: "white",
                  margin: "10px",
                }}
                className="category-btn"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography variant="subtitle1" sx={{ color: "primary.dark" }}>
              On screen text
            </Typography>
          </Grid>
          <Grid item xs={9} md={10}>
            <Box p={1.5} borderRadius="5px" sx={{ backgroundColor: "white" }}>
              <Typography variant="body1" sx={{ color: "#1D5B79" }}>
                CURRENTLY THEIR IS NO ONSCREEN TEXT, THIS IS HARDCODED
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={3} md={2}>
            <Typography variant="subtitle1" sx={{ color: "primary.dark" }}>
              Description
            </Typography>
          </Grid>
          <Grid item xs={9} md={10}>
            <Box p={1.5} borderRadius="5px" sx={{ backgroundColor: "white" }}>
              <Input
                name="desc"
                onChange={handleChange}
                fullWidth={true}
                value={description}
                placeholder="Enter the description here"
                multiline={true}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Frame;
