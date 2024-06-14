// all the commented code is to deal with the functionality of handling private videos

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Navbar } from "..";
import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
  // FormControl,
  // RadioGroup,
  // FormControlLabel,
  // Radio,
  InputAdornment,
  TextField,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';

function tokenUsable(token){
  // User is not logged in, display Material-UI Alert
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

  // Check if the token is not expired
  return decodedToken.exp > currentTime;

}

const UploadVideo = () => {
  const [selectedCategory, setSelectedCategory] = useState("Upload");
  const [loading, setLoading] = React.useState(false);
  const [heading, setHeading] = React.useState(
    "Add a video title and upload video file"
  );
  const [smallHeading, setSmallHeading] = React.useState(
    "Once uploaded and described, your video will be visible on homepage"
  );
  const [visibility, setVisibility] = useState("public");
  const [selectedFile, setSelectedFile] = useState();
  const [videoTitle, setVideoTitle] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  // const handleVisibilityChange = (event) => {
  //   setVisibility(event.target.value);
  // };

  const handleTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    // Assuming you have a function to handle redirects to the sign-in page
    // handleRedirectToSignIn(); // You need to implement this function
  };

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    setSelectedFile(e.target.files[0]);
    const token = Cookies.get("jwtToken");

    // check if user is logged out or if token is expired
    if (!token) {
      setAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("jwt", token);
    formData.append("file", e.target.files[0]);
    formData.append("title", videoTitle);
    formData.append("public_or_private", visibility);

    console.log("This is my form data", visibility);

    // Define the API endpoint where you want to send the POST request
    const apiUrl = "https://vidscribe.org/b/api/upload/";

    // Seting the page to loading
    setHeading("Your file is being loaded, do not refresh page.");
    setSmallHeading(
      "You will be redirected to the video page when the video is described"
    );
    setLoading(true);

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Use ‘multipart/form-data’ for file uploads
        },
      })
      .then((response) => {
        // Handle the successful response
        console.log("Response:", response.data);
        navigate("/");
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
        setLoading(false)
        setHeading("Error in uploading your file, please try again");
        setSmallHeading("Make sure, you are uploading an mp4 file");
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
      {/*  The box is the sidebar */}
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
          al
        >
          <Typography variant="h4" fontWeight="bold" color="primary.dark">
            {heading}
          </Typography>
          <Typography variant="caption" fontWeight="bold" color="primary.dark">
            {smallHeading}
          </Typography>
          <br />
          {/* <Typography variant="caption" fontWeight="bold" color="secondary.main">
            Choose whether you would like the video to be public or private. The video is private by default.
          </Typography> */}
          {!loading && (
            <Box>
              {/* <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="visibility"
                  name="visibility"
                  value={visibility}
                  onChange={handleVisibilityChange}
                >
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="Public"
                  />
                </RadioGroup>
              </FormControl> */}
              <TextField
                label="Video Title"
                variant="outlined"
                value={videoTitle}
                fullWidth
                onChange={handleTitleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        sx={{
                          backgroundColor: "secondary.main",
                          color: "white",
                        }}
                        className="category-btn"
                        component="label"
                        startIcon={<FileUploadIcon />}
                        disabled={loading || videoTitle.trim() === ""}
                      >
                        Upload Video File
                        <input
                          type="file"
                          accept=".mp4"
                          hidden
                          onChange={handleFileUpload}
                        />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
          {loading && <CircularProgress sx={{ mt: 3 }} />}
        </Stack>
      </Stack>
    </div>
  );
};

export default UploadVideo;