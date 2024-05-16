import React, { useState, useEffect } from "react";
import { Box, Typography  } from "@mui/material";
import { Videos,  Navbar, SideNav } from "../components";
import axios from "axios";
import Cookies from "js-cookie";

const drawerWidth = 240;

export default function Feed() {

  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiUrl = "https://vidscribe.org/b/api/all_videos/";
  // const apiUrl = "http://127.0.0.1:8000/api/all_videos/";

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
    <Box sx={{ display: 'flex' }}>
    <SideNav/>
      <Box
        component="main"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, height:"100vh"}}
      >
      <Navbar/>
      <Box m={2} sx={{ backgroundColor: 'secondary.main', p: '0 10px', display: 'inline-block' }}>
        <Typography variant="h4"  sx={{ fontWeight: 'bold'}}>
          Recently Described Videos
        </Typography>
        </Box>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <Videos videos={videoList} />
              )}
          </Box>
    </Box>
  );
}
