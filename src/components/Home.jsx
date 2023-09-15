import React, {  useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {Sidebar, Videos, Navbar} from "./";
import videoMedia from "../data/videoMedia";
import axios from 'axios';
import Cookies from 'js-cookie';


const apiUrl = 'http://127.0.0.1:8000/api/all_videos/';
const token = Cookies.get('jwtToken');

// const authAxios = axios.create({
//   credentials: false,
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })

axios.get(apiUrl, {
  params: { "token": token }
})
  .then((response) => {
    // Handle the successful response
    const videos = response.data;
    console.log(videos);
  })
  .catch((error) => {
    // Handle errors, if any
    console.error('Error:', error);
  });

// // Make the GET request without JWT authentication
// axios.get(apiUrl, {params: {"jwt": token }})
//   .then((response) => {
//     // Handle the successful response
//     const videos = response.data;
//     console.log(videos);
//   })
//   .catch((error) => {
//     // Handle errors, if any
//     console.error("Not getting response back",error.message);
//   });


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Home");

  return (
    <div>
    <Navbar/>
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "100vh" }, paddingRight: { sx: 0, md: 2 } }}>
        <Sidebar 
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
        />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} color={"primary.dark"}>
          Recent Descriptions
        </Typography>
        <Videos videos={videoMedia} />
      </Box>
    </Stack>
    </div>
  );
}

export default Home