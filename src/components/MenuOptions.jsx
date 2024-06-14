import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AskAI, AlertBar } from "./index";
import Cookies from "js-cookie";
import StyledHeading from "./styled_elements/StyledHeading";

const MenuOptions = ({ video_id, video_path, parentCallback, time, youtubeID}) => {
  const [alerttext, setAlerttext] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [turnOnOff, setturnOnOff] = useState("off");
  const [descOn, setDescOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  const handleShareButtonClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  const handleAddDescriptions = () => {
    if (!isLoggedIn) {
      setShowAlert(true);
      setAlerttext("You need to have an account to add descriptions");
    } else {
      navigate("/AddDescriptions", {
        state: { video_id: video_id, video_path: video_path, youtubeID: youtubeID },
      });
    }
  };

  const handleEditDescriptions = () => {
    if (!isLoggedIn) {
      setShowAlert(true);
      setAlerttext("You need to have an account to edit descriptions");
    } else {
      navigate("/EditDescriptions", {
        state: { video_id: video_id, video_path: video_path, youtubeID: youtubeID },
      });
    }
  };

  const handleViewDescriptions = () => {
    setturnOnOff((prev) => (prev === "off" ? "on" : "off"));
    setDescOn((prev) => !prev);
    parentCallback(descOn);
  };

  // checking if the user is logged in
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    }
  }, []); // This effect runs only once, on component mount

  const handleCloseAlertCallback = () => {
    setShowAlert();
  };

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: "white",
      }}
      boxShadow={3}
    >
      {showAlert && (
        <AlertBar
          alertText={alerttext}
          parentCallback={handleCloseAlertCallback}
        />
      )}
      <StyledHeading text={"Options"} />
      <Button
        variant="contained"
        component="label"
        className="category-btn"
        sx={{
          mb: 1,
          p: "10px 20px",
          borderRadius: "30px",
          width: "100%",
        }}
        aria-label="Turn on/off descriptions for the video"
        onClick={handleViewDescriptions}
      >
        Turn {turnOnOff} descriptions
      </Button>

      <AskAI videoID={video_id} timeStamp={time} />

      <Button
        variant="contained"
        component="label"
        className="category-btn"
        sx={{
          mb: 1,
          p: "10px 20px",
          borderRadius: "30px",
          width: "100%",
        }}
        aria-label="If you want to add your own descriptions, you can do so by clicking on this button"
        onClick={handleAddDescriptions}
      >
        Add description
      </Button>
      {/* {noDescription && ( */}
      <Button
        variant="contained"
        component="label"
        className="category-btn"
        sx={{
          mb: 1,
          p: "10px 20px",
          borderRadius: "30px",
          width: "100%",
        }}
        aria-label="If you want to edit the descriptions, you can do so by clicking on this button"
        onClick={handleEditDescriptions}
      >
        Edit descriptions
      </Button>
      <Button
        variant="contained"
        component="label"
        className="category-btn"
        sx={{
          mb: 1,
          p: "10px 20px",
          borderRadius: "30px",
          width: "100%",
        }}
        onClick={handleShareButtonClick}
        aria-label="If you want share the video with other users, the url will be copied to your clipboard"
      >
        Share video Link
      </Button>
      {copied && (
        <Box mt={1}>
          <span style={{ color: "green" }}>Copied to clipboard!</span>
        </Box>
      )}
    </Box>
  );
};

export default MenuOptions;
