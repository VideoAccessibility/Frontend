import React, {  useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {IssuesVideos, Sidebar} from "./";
import videoMedia from "../data/videoMedia";

const IssuesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Issues");

    return (
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box sx={{ height: { sx: "auto", md: "100vh" }, paddingRight: { sx: 0, md: 2 } }}>
          <Sidebar 
            selectedCategory = {selectedCategory}
            setSelectedCategory = {setSelectedCategory}
          />
        </Box>
        <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "#226597" }}>
            Flagged videos
          </Typography>
          <IssuesVideos videos={videoMedia} />
        </Box>
      </Stack>
    );
}

export default IssuesPage