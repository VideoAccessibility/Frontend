import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos, Navbar } from "./";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom"; // Import useParams

const VideoSearch = () => {
  const { searchQuery } = useParams(); // Get the search query from URL params
  const [isLoading, setLoading] = useState(true);
  const [videoList, setVideoList] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const apiUrl = "https://vidscribe.org/api/all_videos/";

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
          <Sidebar />
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
            Search results
          </Typography>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Videos videos={filteredVideos} />
          )}
        </Box>
      </Stack>
    </div>
  );
}

export default VideoSearch;


// import React, { useState, useEffect } from "react";
// import { Box, Stack, Typography, Button } from "@mui/material";
// import { Sidebar,Videos,  Navbar } from "./";
// import axios from "axios";
// import Cookies from "js-cookie";

// const VideoSearch = ({ searchQuery }) => {
//   const [isLoading, setLoading] = useState(true);
//   const [videoList, setVideoList] = useState([]);
//   const [filteredVideos, setFilteredVideos] = useState([]);

//   console.log("this is my searchQuery ", searchQuery)

//   const apiUrl = "http://127.0.0.1:8000/api/all_videos/";

//   useEffect(() => {
//     const jwtToken = Cookies.get("jwtToken"); // Get JWT token from cookies

//     // Check if the user is authenticated
//     if (jwtToken) {
//       const params = { jwt: jwtToken };
//       axios
//         .get(apiUrl, { params: params })
//         .then((response) => {
//           setVideoList(
//             response.data.videos.map((item) => {
//               return JSON.parse(item);
//             })
//           );
//           setFilteredVideos(videoList.filter((video) =>
//             video.title.toLowerCase().includes(searchQuery.toLowerCase())))
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setLoading(true);
//         });
//     } else {
//       // User is not authenticated, make a request without the JWT token
//       axios
//         .get(apiUrl)
//         .then((response) => {
//           setVideoList(
//             response.data.videos.map((item) => {
//               return JSON.parse(item);
//             })
//           );
//           setFilteredVideos(videoList.filter((video) =>
//           video.title.toLowerCase().includes(searchQuery.toLowerCase())))
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setLoading(true);
//         });
//     }
//   }, []);
//   return (
//     <div>
//     <Navbar />
//     <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
//       <Box
//         sx={{
//           height: { xs: "auto", md: "100vh" },
//           paddingRight: { xs: 0, md: 2 },
//           marginBottom: 2,
//         }}
//       >
//         <Sidebar
//         />
//       </Box>
//       <Box
//         p={2}
//         sx={{
//           overflowY: "auto",
//           height: "90vh",
//           flex: 2,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" mb={2} color="primary.dark">
//           Search results
//         </Typography>
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <Videos videos={filteredVideos} />
//         )}
//       </Box>
//     </Stack>
//   </div>
//   );
// }

// export default VideoSearch;