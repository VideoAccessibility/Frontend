import React from "react";
import { Stack, Box } from "@mui/material";
import { VideoCard } from "./";
import videoMedia from "../data/videoMedia";

const Videos = () => {
  return (
    <Stack direction={"row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videoMedia.map((item, idx) => (
        <Box key={idx}>
          {<VideoCard 
          id = {item.id}
          url = {item.url}
          channelTitle = {item.channel}
          title = {item.title}
          image = {item.image}
          /> }
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;