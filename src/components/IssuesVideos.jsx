import React from "react";
import { Stack, Box } from "@mui/material";
import {IssuesVideoCard} from "./";
import issuesMedia from "../data/issuesMedia";

const IssuesVideos = () => {
  return (
    <Stack direction={"row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {issuesMedia.map((item, idx) => (
        <Box key={idx}>
          {<IssuesVideoCard
          id = {item.id}
          url = {item.url}
          channelTitle = {item.channel}
          title = {item.title}
          image = {item.image}
          flag = {item.flags}
          /> }
        </Box>
      ))}
    </Stack>
  )
}

export default IssuesVideos