// all the commented code is to deal with the functionality of handling private videos

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Navbar } from "./";
import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  FormControlLabel,
  Snackbar,
  Alert,
  AlertTitle,
  Switch,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function tokenUsable(token) {
  // User is not logged in, display Material-UI Alert
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

  // Check if the token is not expired
  return decodedToken.exp > currentTime;
}

const UploadUrl = () => {
  const [selectedCategory, setSelectedCategory] = useState("Use URL");
  const [loading, setLoading] = React.useState(false);
  const [heading, setHeading] = React.useState("Add a YouTube video URL");
  const [smallHeading, setSmallHeading] = React.useState(
    "Once uploaded and described, your video will be visible on the homepage"
  );
  const [url, setUrl] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  const handleAlertClose = () => {
    setAlertOpen(false);
    // Assuming you have a function to handle redirects to the sign-in page
    // handleRedirectToSignIn(); // You need to implement this function
  };

  function handleChange(event) {
    const value = event.target.value;
    setUrl(value);
  }

  const handleVisibilityChange = () => {
    setVisibility((prevVisibility) =>
      prevVisibility === "public" ? "private" : "public"
    );
  };

  const handleURLUpload = () => {
    const token = Cookies.get("jwtToken");
    const apiUrl = "https://vidscribe.org/api/youtube_video/";

    const postData = {
      youtube_url: url,
      jwt: token,
      public_or_private: visibility,
    };

    // check if user is logged out or if token is expired
    if (!token || !tokenUsable(token)) {
      setAlertOpen(true);
      return;
    }

    setHeading("Your file is being loaded, do not refresh the page");
    setSmallHeading(
      `You will be redirected to the video page when the video is described. Visibility: ${visibility}`
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
        setHeading("Error in uploading your file, please try again");
        setSmallHeading("Make sure you are entering a valid YouTube URL");
      });
  };

  return (
    <div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleAlertClose}>
          <AlertTitle>Authentication Error</AlertTitle>
          You need to be logged in to upload a video.
        </Alert>
      </Snackbar>
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

        <Stack
          width={{ xs: "80%", md: "50%" }}
          p={3}
          m={3}
          spacing={3}
          borderRadius={4}
          boxShadow={3}
          justifyContent={"center"}
          height={{ md: "400px" }}
        >
          <Typography variant="h4" fontWeight="bold" color="primary.dark">
            {heading}
          </Typography>
          <Typography variant="caption" fontWeight="bold" color="primary.dark">
            {smallHeading}
          </Typography>
          {!loading && (
            <TextField
              label="Enter YouTube URL"
              onChange={handleChange}
              value={url}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <FormControlLabel
                        control={
                          <Switch
                            checked={visibility === "public"}
                            onChange={handleVisibilityChange}
                            color="secondary"
                          />
                        }
                        label={visibility === "public" ? "Public" : "Private"}
                      /> */}
                    <Button
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "white",
                      }}
                      className="category-btn"
                      component="label"
                      disabled={loading}
                      onClick={handleURLUpload}
                    >
                      Submit URL
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
          {loading && <CircularProgress />}
        </Stack>
      </Stack>
    </div>
  );
};

export default UploadUrl;
