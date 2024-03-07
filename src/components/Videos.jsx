import React from "react";
import { Stack, Box } from "@mui/material";
import { VideoCard } from "./";

function ensureVideoUrlFormat(url) {
  // Check if url is null or undefined
  if (url == null) {
      console.error("Error: URL is null or undefined");
      return null; // Return null in case of error
  }

  // Check if the URL already starts with "videos/"
  if (!url.startsWith("videos/")) {
      // If not, prepend "videos/" to the URL
      url = "videos/" + url;
  }
  return url;
}

function transformPath(path) {
  if (path) {
    // If the path does not contain "/video", add it to the path
    if (!path.includes("videos")) {
      path = "videos/" + path;
    }
    // Replace the file extension with ".png"
    return "https://vidscribe.org/" + path.replace(/\.mp4$/, '.png');
  } else {
    // Handle the case where path is null or undefined
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg";
  }
}

const Videos = (props) => {
  console.log("these are the props", props.videos);
  // Reverse the array to display videos in a Last In, First Out (LIFO) order
  const reversedVideos = [...props.videos].reverse();

  return (
    <Stack
      direction={"row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {reversedVideos.map((item, idx) => (
        <Box key={idx}>
          {
            <VideoCard
              id={item.id}
              path={ensureVideoUrlFormat(item.video_path)}
              channelTitle={item.title}
              title={item.title}
              image={transformPath(item.video_path)}
            />
          }
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
