// This component displays all the cards
import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, Box, Button} from "@mui/material";

const VideoCard = (props) => {
  const video_id = props.id;

  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return(
  <Link to={`/VideoPage/${video_id}`}>
  <Card
        sx={{
          maxWidth: 345,
          backgroundColor: 'transparent',
          width: { xs: '100%', sm: '350px', md: "270px" }, 
          boxShadow: 'none',
          position: 'relative',
          '&:hover': {
            transform: 'scale(1.05)', // Adjust as needed
            transition: 'transform 0.2s ease-in-out', // Adjust duration and timing function as needed
          },
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
      <CardMedia
        component="img"
        image={props.image}
        alt="Image"
        sx={{ 
          width: { xs: '100%', sm: '350px', md: "270px" }, 
          height: 180 }} 
      />
      <CardContent>
        <Box
          sx={{
            position: 'relative',
            top: '-40px', // Adjust as needed
            bgcolor: '#FFFFFF',
            width: 'calc(100% - 20px)', // Adjust as needed
            minHeight:"110px",
            padding: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1,
          }}
        >
          <Typography variant="body1" component="div" gutterBottom>
          {props.title.slice(0, 60)}
          </Typography>
          <Link to={`/VideoPage/${video_id}`}>
            <Typography variant="subtitle2" gutterBottom
            sx={{
                color: hovered ? 'primary.main' : 'black', // Change text color on hover
                textDecoration: 'underline', // Underline text on hover
                transition: 'color 0.2s, text-decoration 0.2s', // Adjust transition timing
              }}>
              Watch video
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  </Link>
)};

export default VideoCard


// // This component displays all the cards
// import React from 'react'
// import { Link } from "react-router-dom"; 
// import { Typography, Card, CardContent, CardMedia, Grid} from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// const VideoCard = (props) => {
//   const video_id = props.id;
//   return(
//   <Link to={`/VideoPage/${video_id}`}>
//   <Card 
//   sx={{ 
//     width: { xs: '100%', sm: '350px', md: "270px", }, 
//     boxShadow: "none", 
//     borderRadius: "10px" }}>
//     {/* passing the video path to the video page */}
//       <CardMedia image={props.image} 
//         sx={{ 
//           width: { xs: '350px', sm: '350px',md: "270px", }, 
//           height: 180 }} 
//       />

//     <CardContent 
//     sx={{ 
//       backgroundColor: "primary.main", 
//       height: '100px' }}>

//         <Typography 
//         variant="subtitle1" 
//         fontWeight="bold" 
//         color="primary.dark">
//         {/* The slice function is  used to reduce the title length to 60*/}
//           {props.title.slice(0, 60)}
//         </Typography>

//         {/* <Typography variant="subtitle2" color="primary.dark">
//           {props.channelTitle}
//           <CheckCircleIcon sx={{ fontSize: "12px", color: "primary.dark", ml: "5px" }} />
//         </Typography> */}

//         <Grid container paddingTop={1}>
//             <Typography fontSize="0.75rem" color="white" backgroundColor="secondary.main" padding="3px 10px" borderRadius="5px" marginRight={"10px"}>
//                 Described by AI
//         </Typography>
//         </Grid>
//     </CardContent>
//   </Card>
//   </Link>
// )};

// export default VideoCard