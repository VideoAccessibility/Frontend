import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Videos,  Navbar, SideNav } from "../components";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom"; // Import useParams

const drawerWidth = 240;

const Search = () => {
  const { searchQuery } = useParams(); // Get the search query from URL params
  const [isLoading, setLoading] = useState(true);
  const [videoList, setVideoList] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const apiUrl = "https://vidscribe.org/b/api/all_videos/";

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");

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
  }, [searchQuery]); // Add searchQuery to dependency array to fetch data when searchQuery changes

  useEffect(() => {
    setFilteredVideos(videoList.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [videoList, searchQuery]); // Update filteredVideos when videoList or searchQuery changes

  return (
    <Box sx={{ display: 'flex' }}>
    <SideNav/>
      <Box
        component="main"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, height:"100vh"}}
      >
      <Navbar/>
      <Box m={2} sx={{ backgroundColor: 'secondary.main', p: '0 10px', display: 'inline-block' }}>
        <Typography variant="h4"  sx={{ fontWeight: 'bold'}}>
          Search Results
        </Typography>
        </Box>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <Videos videos={filteredVideos} />
              )}
          </Box>
    </Box>
  );
}

export default Search;