import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Sidebar, Videos, Navbar } from "./";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiUrl = "https://vidscribe.org/b/api/all_videos/";

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken"); // Get JWT token from cookies

    // Check if the user is authenticated
    if (jwtToken) {
      const params = { jwt: jwtToken };
      axios
        .get(apiUrl, { params: params })
        .then((response) => {
          setVideoList(
            response.data.videos.map((item) => {
              return JSON.parse(item);
            })
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(true);
        });
    } else {
      // User is not authenticated, make a request without the JWT token
      axios
        .get(apiUrl)
        .then((response) => {
          setVideoList(
            response.data.videos.map((item) => {
              return JSON.parse(item);
            })
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(true);
        });
    }
  }, []);
 
  return (
    <div>
      <Navbar />
      <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box
          sx={{
            height: { xs: "auto", md: "100vh" },
            paddingRight: { xs: 0, md: 2 },
            marginBottom: 2,
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>
        <Box
          p={2}
          sx={{
            overflowY: "auto",
            height: "90vh",
            flex: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2} color="primary.dark">
            Recently Described Videos
          </Typography>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Videos videos={videoList} />
          )}
        </Box>
      </Stack>
    </div>
  );
};

export default Home;
