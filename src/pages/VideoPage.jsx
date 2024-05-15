import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid, Button, Divider } from "@mui/material";
import {
  Sidebar,
  Comment,
  AskAI,
  Navbar,
  VideoPlayer,
  YoutubeVideoPlayer,
  ChangeRating,
  Player,
  AlertBar,
  MenuOptions,
  DisplayDescriptions,
  StyledHeading,
  TextToSpeech,
  YoutubeOrLocal,
} from "../components/";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import formatTime from "../utils/functions";
import tokenUsable from "../utils/loggedIn";
import { SideNav } from "../components";
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

function ensureVideoId(url){
  if (url !== "") {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|.*[&?]))([^&?\s]+)/);
    if (match && match[1]) {
        return match[1];
    }
}
}

const drawerWidth = 200;

const VideoPage = () => {
  const apiUrl = "https://vidscribe.org/b/api/video/";
  // const apiUrl = "http://127.0.0.1:8000/api/video/";
  const token = Cookies.get("jwtToken");
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [alerttext, setAlerttext] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPlaying, setIsplaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [desc, setDesc] = useState();
  const [descUser, setDescUser] = useState();
  const [video, setVideo] = useState([]);
  const [descOn, setDescOn] = useState(true);
  const navigate = useNavigate();

  // these are some error handling checks that I am doing
  const [noDescription, setNoDescription] = useState(false);

  // checking if the user is logged in
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    }
  }, []); // This effect runs only once, on component mount

  const { video_id } = useParams();
  const params = { id: video_id, jwt: token };
  const url = "https://vidscribe.org/b/descriptions/";
  const parameters = { video_id: video_id };

  const handleKeyDown = (event) => {
    // Check if the pressed key is 'o'
    if (event.key === "o" || event.key === "O") {
      handleViewDescriptions();
    }
  };

  const handleViewDescriptions = (descOn) => {
    console.log("This is the value of desc on", descOn)
    setDescOn(descOn);
  };

  const handleCallback = (progressData, audioDescription, playVid) => {
    // console.log("getting thos", audioDescription)
    setPlayed(progressData);
    setIsplaying(playVid);
    console.log("Value in video page", playVid)
  };

  const handleResumeDescriptionCallback = () => {
    setIsplaying(true);
  };

  const handleChangeUserCallback = (filteredDescriptions) => {
    setDescUser(filteredDescriptions);
  };


  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // height: "100vh",
        }}
      >
        <Navbar />
        <Grid container>
          <Grid item xs={12} md={7} m={2}>
            {!isLoading && (
              <>
              <YoutubeVideoPlayer
                yesDesc={descOn}
                path={ensureVideoUrlFormat(video.video_path)}
                playVid = {isPlaying}
                title={video.title}
                descrip={descUser}
                parentCallback={handleCallback}
                videoID={ensureVideoId(video.url)}
              />
              </>
            )}

            {noDescription && descOn && (
              <ChangeRating
                descriptions={desc}
                parentCallback={handleChangeUserCallback}
              />
            )}
          </Grid>
          <Grid item xs={12} md={4} m={2}>
            <MenuOptions video_id={video_id} video_path={video.video_path} parentCallback={handleViewDescriptions} time={played}/>

            <Box
            mt={2}
              p={2}
              sx={{
                backgroundColor: "white",
                paddingBottom: "20px",
              }}
              boxShadow={3}
            >
              <Typography variant="h6" sx={{ color: "primary.dark" }} marginBottom={1}>
                Q&A
              </Typography>
              <Divider/>
              <Box sx={{ overflow: "scroll", height: "350px" }} mt={1}>
                <Comment videoID={video_id} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VideoPage;
