import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs from "dayjs";
import {
  Box,
  Stack,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
} from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import axios from "axios";
import Cookies from "js-cookie";
import formatTime from "../utils/functions";
import { useLocation } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SideNav, Navbar, Player, StyledHeading } from "../components/";

const drawerWidth = 200;

const AddDescriptions = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [endTime, setEndTime] = useState(dayjs("00:00", "mm:ss"));
  const [startTime, setStartTime] = useState(dayjs("00:00", "mm:ss"));
  const [played, setPlayed] = useState(0);
  const [frames, setFrames] = useState([]);
  const [description, setDescription] = useState("");
  const [recentlyAddedFrameId, setRecentlyAddedFrameId] = useState(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const playerRef = useRef(null);
  const framesContainerRef = useRef(null);
  const location = useLocation();
  const { video_id, video_path } = location.state;

  // Load frames from localStorage on component mount
  useEffect(() => {
    const storedFrames = localStorage.getItem(`frames_${video_id}`);
    if (storedFrames) {
      setFrames(JSON.parse(storedFrames));
    }
  }, [video_id]);

  // Update frames in localStorage whenever frames state changes
  useEffect(() => {
    localStorage.setItem(`frames_${video_id}`, JSON.stringify(frames));
  }, [frames, video_id]);

  const handleCallback = (progressData) => {
    setPlayed(progressData);

    // Update startTime dynamically
    setStartTime(dayjs(progressData * 1000));
    setEndTime(dayjs(progressData * 1000));
  };

  const handleAddFrame = () => {
    // Set the index of the newly added frame
    if (description) {
      const newFrame = {
        id: Date.now(),
        start: parseInt(startTime.$m) * 60 + parseInt(startTime.$s),
        end: parseInt(endTime.$m) * 60 + parseInt(endTime.$s),
        description: description,
      };
      setFrames([...frames, newFrame]);

      // Update recently added frame ID
      setRecentlyAddedFrameId(newFrame.id);

      setDescription("");
      setEndTime(dayjs("00:00", "mm:ss"));
      //console.log(parseInt(endTime.$m)*60 + parseInt(endTime.$s))
      // Find the index of the newly added frame in the sorted frames
      console.log("this is frame ref", framesContainerRef.current);
    } else {
      // Handle invalid input (show error message, prevent adding frame, etc.)
      console.log("Invalid input. Please enter a valid end time.");
    }
  };

  const scrollToFrame = (id) => {
    const frameElement = document.getElementById(`frame_${id}`);
    if (frameElement) {
      frameElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    // Scroll to the new frame when frames state changes
    const latestFrame = frames[frames.length - 1];
    if (latestFrame) {
      scrollToFrame(latestFrame.id);
    }
  }, [frames]);

  const handleReplayFrame = (startTimestamp) => {
    // Call the seekToTimestamp function in the Player component
    if (playerRef.current) {
      playerRef.current.seekTo(startTimestamp, "seconds");
      setPlayed(startTimestamp); // Update the played state to reflect the new timestamp
    }
  };

  const handleRemoveFrame = (id) => {
    const updatedFrames = frames.filter((frame) => frame.id !== id);
    setFrames(updatedFrames);
  };

  const handleEditFrame = (id) => {
    const index = frames.findIndex((frame) => frame.id === id);
    setSelectedFrameIndex(index);
    setDescription(frames[index].description);
    setEndTime(dayjs(formatTime(frames[index].end), "mm:ss"));
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (description) {
      const updatedFrames = [...frames];
      updatedFrames[selectedFrameIndex].description = description;
      updatedFrames[selectedFrameIndex].end =
        parseInt(endTime.$m) * 60 + parseInt(endTime.$s);
      setFrames(updatedFrames);
      setEditDialogOpen(false);
      setDescription("");
      setEndTime(dayjs("00:00", "mm:ss"));
      setRecentlyAddedFrameId(updatedFrames[selectedFrameIndex].id);
    }
  };

  const handlePublishDescriptions = async () => {
    try {
      for (let frame of frames) {
        // Assuming you have an API endpoint for posting descriptions, adjust the URL accordingly
        const apiUrl = "https://vidscribe.org/b/descriptions/";
        const token = Cookies.get("jwtToken");
        const response = await axios.post(apiUrl, {
          video_id: video_id,
          jwt: token,
          time_stamp_start: frame.start,
          descriptions: frame.description,
          time_stamp_end: frame.end,
          ai_or_human: "human",
        });

        // Handle the response from the backend API if needed
        console.log("Description published:", response.data);
      }

      // Optional: Show a success message to the user after all descriptions are published
      console.log("All descriptions published successfully!");
    } catch (error) {
      // Handle errors if the API request fails
      alert("Error publishing descriptions. Please try again.");
      console.error("Error publishing descriptions:", error);
    }
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
            <Grid item xs={12} md={6} m={2}>
              <Player
                path={video_path}
                parentCallback={handleCallback}
                seekToTimestamp={handleReplayFrame}
                playerRef={playerRef}
              />
              <Box
                p={2}
                boxShadow={3}
                sx={{
                  backgroundColor: "white",
                  paddingBottom: "20px",
                }}
                mt={1}
              >
                <StyledHeading text={"Add descriptions"} />
                <Divider />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    label="Start timestamp"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    format="mm:ss"
                    sx={{
                      margin: "10px 0",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    label="End timestamp"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    format="mm:ss"
                    sx={{
                      margin: "10px 0",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  />
                  {/* {console.log("this is value", endTime.$m, endTime.$s)} */}
                </LocalizationProvider>

                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter description"
                  sx={{
                    marginBottom: "10px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  sx={{ backgroundColor: "secondary.main", color: "white" }}
                  className="category-btn"
                  onClick={handleAddFrame}
                >
                  Add Description
                </Button>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={5}
              marginLeft={1}
              boxShadow={3}
              sx={{
                backgroundColor: "white",
                height: "85vh", // Set the height to 75vh
                overflowY: "auto", // Set overflow to auto for vertical scrolling
              }}
            >
              <Box sx={{ height: "75vh", overflowY: "auto" }}>
                {frames
                  .slice() // Create a shallow copy of the frames array
                  .sort((a, b) => a.start - b.start) // Sort the frames based on starting timestamp
                  .map((frame, index) => (
                    <Box
                      key={index}
                      borderBottom={0.1}
                      borderColor={"primary.dark"}
                      p={2}
                      id={`frame_${frame.id}`}
                      className={
                        recentlyAddedFrameId === frame.id
                          ? "recently-added"
                          : ""
                      }
                    >
                      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {/* Displays Scene number */}
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            sx={{ color: "primary.dark" }}
                          >
                            Scene {index + 1}
                          </Typography>
                        </Grid>
                        {/* Displays time stamp */}
                        <Grid item xs={4}>
                          <Chip
                            label={
                              formatTime(frame.start) +
                              " - " +
                              formatTime(frame.end)
                            }
                            sx={{
                              backgroundColor: "primary.main",
                              color: "white",
                              marginBottom: "20px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <Box display="flex" justifyContent="flex-end">
                            <IconButton
                              edge="end"
                              aria-label="replay the scene from the start timestamp"
                              onClick={() => handleReplayFrame(frame.start)}
                            >
                              <ReplayIcon
                                sx={{
                                  color: "primary.main",
                                }}
                                aria-label="replay the scene from the start timestamp"
                              />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleRemoveFrame(frame.id)}
                              sx={{ marginLeft: "20px" }}
                            >
                              <DeleteIcon
                                sx={{
                                  color: "primary.main",
                                }}
                                aria-label="delete scene"
                              />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleEditFrame(frame.id)}
                              sx={{ marginLeft: "20px" }}
                            >
                              <EditIcon
                                sx={{
                                  color: "primary.main",
                                }}
                                aria-label="edit scene"
                              />
                            </IconButton>
                          </Box>
                        </Grid>

                        <Grid item xs={3} md={3}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "primary.dark" }}
                          >
                            Description
                          </Typography>
                        </Grid>
                        <Grid item xs={9} md={9}>
                          <Box
                            p={1.5}
                            sx={{ backgroundColor: "white" }}
                            borderColor={"primary.dark"}
                            border={0.1}
                          >
                            <Typography
                              variant="body1"
                              sx={{ color: "#1D5B79" }}
                            >
                              {frame.description}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
              </Box>

              <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                fullWidth
              >
                <DialogTitle>Edit Description </DialogTitle>
                <DialogContent>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      label="End timestamp"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      format="mm:ss"
                      sx={{
                        marginBottom: "10px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                    />
                    {/* {console.log("this is value", endTime.$m, endTime.$s)} */}
                  </LocalizationProvider>
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter description"
                    style={{ marginBottom: "10px" }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setEditDialogOpen(false)}
                    sx={{ backgroundColor: "secondary.main", color: "white" }}
                    className="category-btn"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    sx={{ backgroundColor: "secondary.main", color: "white" }}
                    className="category-btn"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <Divider />
              <Button
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                  margin: "20px",
                }}
                className="category-btn"
                onClick={handlePublishDescriptions}
                disabled={frames.length <= 0}
              >
                Publish Description
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default AddDescriptions;
