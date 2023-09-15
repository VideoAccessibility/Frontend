// This component displays all the cards
import React from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, Grid} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Tag} from "./";

const VideoCard = (props) => (
  <Card 
  sx={{ 
    width: { xs: '100%', sm: '358px', md: "270px", }, 
    boxShadow: "none", 
    borderRadius: "10px" }}>

    <Link to={props.url}>
      <CardMedia image={props.image} 
        sx={{ 
          width: { xs: '100%', sm: '358px'}, 
          height: 180 }} 
      />
    </Link>

    <CardContent 
    sx={{ 
      backgroundColor: "primary.main", 
      height: '120px' }}>

      <Link to={props.url} >
        <Typography 
        variant="subtitle1" 
        fontWeight="bold" 
        color="primary.dark">
        {/* The slice function is  used to reduce the title length to 60*/}
          {props.title.slice(0, 60)}
        </Typography>

      </Link>
      <Link to={props.url} >

        <Typography variant="subtitle2" color="primary.dark">
          {props.channelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "primary.dark", ml: "5px" }} />
        </Typography>

        <Grid container paddingTop={1}>
            <Tag
              colour = "secondary.main"
              text = "AI description"
            />
            <Tag
              colour = "secondary.light"
              text = "Human description"
            />
        </Grid>

      </Link>
    </CardContent>
  </Card>
);

export default VideoCard