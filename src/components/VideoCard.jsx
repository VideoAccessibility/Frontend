// This component displays all the cards
import React from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, Grid} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VideoCard = (props) => (
  
  <Card 
  sx={{ 
    width: { xs: '100%', sm: '350px', md: "270px", }, 
    boxShadow: "none", 
    borderRadius: "10px" }}>
    {/* passing the video path to the video page */}
    <Link to="/VideoPage" state={{video_id : props.id }}>
      <CardMedia image={props.image} 
        sx={{ 
          width: { xs: '350px', sm: '350px',md: "270px", }, 
          height: 180 }} 
      />
    </Link>

    <CardContent 
    sx={{ 
      backgroundColor: "primary.main", 
      height: '100px' }}>

      <Link to="/VideoPage" state={{ path: props.path, video_id : props.id }}>
        <Typography 
        variant="subtitle1" 
        fontWeight="bold" 
        color="primary.dark">
        {/* The slice function is  used to reduce the title length to 60*/}
          {props.title.slice(0, 60)}
        </Typography>

      </Link>
      <Link to="/VideoPage" state={{ path: props.path, video_id : props.id }}>

        {/* <Typography variant="subtitle2" color="primary.dark">
          {props.channelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "primary.dark", ml: "5px" }} />
        </Typography> */}

        <Grid container paddingTop={1}>
            <Typography fontSize="0.75rem" color="white" backgroundColor="secondary.main" padding="3px 10px" borderRadius="5px" marginRight={"10px"}>
                Described by AI
        </Typography>
        </Grid>

      </Link>
    </CardContent>
  </Card>
);

export default VideoCard