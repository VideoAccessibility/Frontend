import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid, TextField, Button } from "@mui/material";
import { Sidebar, Player, Scene, Navbar, Notes, Frame, SideNav, YoutubeVideoPlayer} from "../components/";
import { useLocation, Link } from "react-router-dom";

const drawerWidth = 200;

function ensureVideoUrlFormat(url) {
  // Check if url is null or undefined
  if (url == null) {
    console.error("Error: URL is null or undefined");
    return null; // Return null in case of error
  }

  // Check if the URL already starts with "videos/"
  if (!url.startsWith("videos/")) {
    // If not, prepend "videos/" to the URL
    url = "videos/" + url;
  }
  return url;
}

function ensureVideoId(url){
  if (url !== "") {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|.*[&?]))([^&?\s]+)/);
    if (match && match[1]) {
        return match[1];
    }
}
}

const EditDescriptions = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [yesFrame, setYesFrame] = useState(false);
  const [played, setPlayed] = useState();
  const [videoDescriptions, setVideoDescriptions] = useState([]);

  const location = useLocation();
  const { video_id, video_path, youtubeID } = location.state;
  console.log("These are my video ids and paths",video_id, video_path, youtubeID)
  // this function just retrives the time the video is played
  const handleCallback = (progressData) => {
    setPlayed(progressData);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Navbar />
          <Grid container>
          <Grid item xs={12} md={8}>
            {/* <Player path={ensureVideoUrlFormat(video_path)} parentCallback={handleCallback} /> */}
            <YoutubeVideoPlayer
                yesDesc={false}
                path={ensureVideoUrlFormat(video_path)}
                parentCallback={handleCallback}
                descrip={null}
                videoID={ensureVideoId(youtubeID)}
              />
          </Grid>

          <Grid item xs={12} md={8}>
            <Scene id={video_id}/>
          </Grid>
          {/* This grid represent the notes section */}
        </Grid>
      </Box>
      </Box>
    </div>
  );
};

export default EditDescriptions;
