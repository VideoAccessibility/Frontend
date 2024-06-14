import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideNav, StyledHeading, AlertBar } from "../components/";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
const drawerWidth = 200;

const UploadURL = () => {
  const [loading, setLoading] = React.useState(false);
  const [heading, setHeading] = React.useState("Add a YouTube video URL");
  const [smallHeading, setSmallHeading] = React.useState(
    "Once uploaded and described, your video will be visible on the homepage"
  );
  const [url, setUrl] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  const handleCloseAlertCallback = () => {
    setAlertOpen();
  };

  function handleChange(event) {
    const value = event.target.value;
    setUrl(value);
  }


  const handleURLUpload = () => {
    const token = Cookies.get("jwtToken");
    const apiUrl = "https://vidscribe.org/b/api/youtube_video/";
    // const apiUrl = "http://127.0.0.1:8000/api/youtube_video/";

    const postData = {
      youtube_url: url,
      jwt: token,
      public_or_private: visibility,
    };

    // check if user is logged out or if token is expired
    if (!token) {
      setAlertOpen(true);
      return;
    }

    setHeading("Your file is being loaded, do not refresh the page");
    setSmallHeading(
      `You will be redirected to the video page when the video is described.`
    );
    setLoading(true);

    axios
      .post(apiUrl, postData)
      .then((response) => {
        // Handle the successful response
        console.log("Response:", response.data);
        navigate("/");
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
        setLoading(false);
        setHeading("Error, please try again");
        setSmallHeading("Make sure you are entering a valid YouTube URL");
      });
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
            height: "100vh",
          }}
        >
          {alertOpen && (
            <AlertBar
              alertText={"You need to be signed in to upload a video on Vidscribe"}
              parentCallback={handleCloseAlertCallback}
            />
          )}

          <Box
            backgroundColor={"white"}
            p={2}
            width={{ xs: "100%", md: "45%" }}
            boxShadow={3}
          >
            <StyledHeading text={heading} />
            <br />
            <Typography variant="caption" color="primary.dark">
              {smallHeading}
            </Typography>
            <br/>
            {!loading && (
              <>
                <TextField
                  label="Enter YouTube URL"
                  onChange={handleChange}
                  value={url}
                  fullWidth
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  component="label"
                  className="category-btn"
                  sx={{
                    mt: 2,
                    mb: 1,
                    p: "10px 20px",
                    borderRadius: "30px",
                    fontSize: "large",
                  }}
                  aria-label="Upload a video on Vidscribe"
                  disabled={loading || url.trim() === ""}
                  onClick={handleURLUpload}
                >
                  Submit URL
                </Button>
              </>
            )}
            {loading && <CircularProgress />}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default UploadURL;
