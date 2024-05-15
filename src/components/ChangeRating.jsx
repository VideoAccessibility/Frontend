import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ChangeRating = ({ descriptions, parentCallback }) => {
  // console.log("These are my props in change rating", descriptions)
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChangeDescriptionClicked, setIsChangeDescriptionClicked] = useState(false);

  useEffect(() => {
    if (descriptions.length > 0) {
      // Extract unique usernames from descriptions
      const uniqueUsernames = Array.from(
        new Set(descriptions.map((description) => description.username))
      );
        // console.log("these are my users", uniqueUsernames)
      // Set the first username as the default selected user
      setSelectedUser(uniqueUsernames[0]);
    }
  }, [descriptions]);

  const handleUserChange = (event) => {
    const username = event.target.value;
    setSelectedUser(username);

    // Filter descriptions based on the selected username and pass them to the parent component
    const filteredDescriptions = descriptions.filter(
      (description) => description.username === username
    );
    parentCallback(filteredDescriptions);
  };
  // const [starClicks, setStarClicks] = useState(selectedUser.starClicks);

  // const handleStarClick = () => {
  //   setStarClicks(selectedUser.starClicks + 1); // Increase star clicks
  //   // You can send the star click data to your API or perform other actions here
  // };

  return (
    <Paper
      variant="outlined"
      sx={{ backgroundColor: "white", padding: "20px", marginTop: "20px" }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: "20px" }}
      >
        <Grid item>
          <Typography variant="body1" color="primary.dark">
            Described by user: {selectedUser}
          </Typography>
          {/* <Typography variant="body2" color="primary.dark">
            <StarIcon
              color="secondary.main"
              onClick={handleStarClick}
              style={{ cursor: "pointer" }}
            />
            {starClicks} People Rated
          </Typography> */}
        </Grid>
        <Grid item>
          <Button
            sx={{
              backgroundColor: "secondary.main",
              color: "white",
              width: "100%",
              marginTop: "10px",
            }}
            className="category-btn"
            onClick={() =>
              setIsChangeDescriptionClicked(!isChangeDescriptionClicked)
            }
          >
            Change Description
          </Button>
        </Grid>
      </Grid>
      {isChangeDescriptionClicked && (
        <div>
          <Divider />
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value={selectedUser}
                  onChange={handleUserChange}
                >
                  {descriptions.length > 0 &&
                    Array.from(
                      new Set(
                        descriptions.map((description) => description.username)
                      )
                    ).map((username) => (
                      <MenuItem key={username} value={username}>
                        {username}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )}
    </Paper>
  );
};

export default ChangeRating;