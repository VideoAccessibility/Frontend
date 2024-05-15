import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid, TextField, Button } from "@mui/material";
import { Sidebar, Player, Scene, Navbar, Notes , Frame} from "..";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const EditDescriptionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [yesFrame, setYesFrame] = useState(false);
  const location = useLocation();
  const { video_id, video_path } = location.state;
  const [isLoading, setLoading] = useState(true);
  const [played, setPlayed] = useState();
  const [videoDescriptions, setVideoDescriptions] = useState([]);

  const apiUrl = "https://vidscribe.org/b/descriptions/";
  const token = Cookies.get("jwtToken");

  const params = {
    video_id: video_id,
    jwt: token,
  };

  useEffect(() => {
    axios
      .get(apiUrl, {
        params: params,
      })
      .then((response) => {
        console.log(
          "This is what I am recieving in edit descriptions page",
          response.data
        );
        setVideoDescriptions(
          response.data.descriptions.map((item) => {
            return JSON.parse(item);
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log("Not recieving data", err);
      });
  }, [yesFrame]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  // this function just retrives the time the video is played
  const handleCallback = (progressData) => {
    setPlayed(progressData);
  };

  // this function deals with two things, one, it adds a frame if the user clicks add frame, two, once user clicks on save changes
  // it removes the added frame
  function addFrame(){
    if( yesFrame){
      setYesFrame(false);
    }
    else{
      setYesFrame(true);
    }
  }

  console.log("this is the video_id", videoDescriptions);
  return (
    // The box is the sidebar
    <div>
      <Navbar />
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box
          sx={{
            height: { sx: "auto", md: "100vh" },
            paddingRight: { sx: 0, md: 2 },
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>

        {/* This container consists of the video player, the video information for now is hardcoded*/}
        <Grid container spacing={2} p ={3} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Grid item xs={12} md={8}>
            <Player path={video_path} parentCallback={handleCallback} />
          </Grid>

          {/* This grid represent the notes section */}
          <Notes/>

          {/* Look into this display thingy */}
          <Box p={2} sx={{ overflow: "scroll", height: { md: "50vh" } }} width={"100%"}>
            <Scene 
            descriptions={videoDescriptions} />
            {yesFrame && <Frame
              timeStamp = {played}
              id = {video_id}
              parentCallback={addFrame}
            />}
          </Box>
          <Button
            sx={{ backgroundColor: "#1D5B79", color: "white", margin: "10px" }}
            className="category-btn"
            onClick={addFrame}
          >
            Add frame at {played}
          </Button>
          {/* <Button
            sx={{ backgroundColor: "#1D5B79", color: "white", margin: "10px" }}
            className="category-btn"
          >
            Save Changes
          </Button> */}
        </Grid>
      </Stack>
    </div>
  );
};

export default EditDescriptionPage;
