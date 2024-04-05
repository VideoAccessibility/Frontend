import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import {
  Sidebar,
  Comment,
  AskAI,
  Navbar,
  VideoPlayer,
  ChangeRating,
  Player,
  AlertBar,
} from "./";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import formatTime from "../utils/functions";
import tokenUsable from "../utils/loggedIn";
import { useParams } from "react-router-dom";

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

const VideoPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [alerttext, setAlerttext] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [played, setPlayed] = useState(0);
  const [desc, setDesc] = useState();
  const [descUser, setDescUser] = useState();
  const [video, setVideo] = useState([]);
  const [turnOnOff, setturnOnOff] = useState("off");
  const [descOn, setDescOn] = useState(true);
  const { video_id } = useParams();
  const navigate = useNavigate();

  // these are some error handling checks that I am doing
  const [noDescription, setNoDescription] = useState(false);


  const apiUrl = "https://vidscribe.org/b/api/video/";
  const token = Cookies.get("jwtToken");

  // checking if the user is logged in
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    }
  }, []); // This effect runs only once, on component mount

  const params = { id: video_id, jwt: token };
  const url = "https://vidscribe.org/b/descriptions/";
  const parameters = { video_id: video_id };

  useEffect(() => {
    axios
      .get(apiUrl, { params: params })
      .then((response) => {
        setVideo(response.data.video);
        console.log("Received video data", response.data.video);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(url, { params: parameters })
      .then((response) => {
        console.log("Received description data", response.data.descriptions);
        const descriptions = response.data.descriptions.map((item) => {
          return JSON.parse(item);
        });
        setDesc(descriptions);
        if (descriptions.length > 0) {
          setNoDescription(true);
        }
        // this just gets the usernames for all the user and then display the descriptions from only one user
        const uniqueUsernames = Array.from(
          new Set(descriptions.map((description) => description.username))
        );
        setDescUser(
          descriptions.filter(
            (description) => description.username === uniqueUsernames[0]
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log("Not receiving data description data", err);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  const handleCallback = (progressData) => {
    setPlayed(progressData);
  };

  const handleChangeUserCallback = (filteredDescriptions) => {
    setDescUser(filteredDescriptions);
  };

  const handleCloseAlertCallback = () => {
    setShowAlert();
  };

  const handleEditDescriptions= () => {
    if (!isLoggedIn){
      setShowAlert(true)
      setAlerttext("to edit descriptions")
    }else{
      navigate("/EditDescriptions", {state:{ video_id: video_id, video_path: video.video_path }})
    }
  }

  const handleAddDescriptions= () => {
    if (!isLoggedIn){
      setShowAlert(true)
      setAlerttext("to add descriptions")
    }else{
      navigate("/AddDescriptions", {state:{ video_id: video_id, video_path: video.video_path }})
    }
  }

  const handleViewDescriptions = () => {
    if (turnOnOff === "off") {
      setturnOnOff("on");
      setDescOn(false);
    } else {
      setturnOnOff("off");
      setDescOn(true);
    }
  };

  return (
    <div>
      {showAlert && 
      <AlertBar 
      alertText={"You need to have an account "+alerttext}
      parentCallback={handleCloseAlertCallback}
      />}
      <Navbar />
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box sx={{ height: { sx: "auto", md: "100vh" } }}>
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>

        <Grid
          container
          spacing={2}
          p={3}
          sx={{ overflowY: "auto", height: "90vh", flex: 2 }}
        >
          <Grid item xs={12} md={8}>
            {!isLoading && noDescription && (
              <VideoPlayer
                yesDesc={descOn}
                path={ensureVideoUrlFormat(video.video_path)}
                title={video.title}
                descrip={descUser}
                parentCallback={handleCallback}
              />
            )}
            {noDescription && descOn && (
              <ChangeRating
                descriptions={desc}
                parentCallback={handleChangeUserCallback}
              />
            )}
            {!noDescription && (
              <Player path={ensureVideoUrlFormat(video.video_path)} parentCallback={handleCallback} />
            )}
            {!noDescription && (
              <div>
                <Typography variant="h6" color={"primary.dark"} paddingTop={2}>
                  {video.title}
                </Typography>
                <hr />
              </div>
            )}
          </Grid>

          {/* This grid is to showcase all the comments */}
          <Grid item xs={12} md={4}>
            <Box
              p={2}
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "5px",
                paddingBottom: "20px",
              }}
            >
              <Typography variant="h6" sx={{ color: "primary.dark" }}>
                Q&A
              </Typography>
              <hr />
              <Box sx={{ overflow: "scroll", height: { md: "55vh" } }}>
                <Comment videoID={video_id} />
              </Box>
            </Box>

            <Box
              p={2}
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "5px",
                margin: "20px 0",
              }}
            >
              <Typography variant="h6" sx={{ color: "primary.dark" }}>
                More Options
              </Typography>
              
              <hr />

              <Button
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                  width: "100%",
                  marginTop: "10px",
                }}
                className="category-btn"
                onClick={handleViewDescriptions}
              >
                Turn {turnOnOff} descriptions
              </Button>

              <AskAI videoID={video_id} timeStamp={played} />

                <Button
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "white",
                    width: "100%",
                    marginTop: "10px",
                  }}
                  className="category-btn"
                  onClick={handleAddDescriptions}
                >
                  Add description
                </Button>
              {noDescription && (
                  <Button
                    sx={{
                      backgroundColor: "secondary.main",
                      color: "white",
                      width: "100%",
                      marginTop: "10px",
                    }}
                    className="category-btn"
                    onClick={handleEditDescriptions}
                  >
                    Edit descriptions
                  </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default VideoPage;
