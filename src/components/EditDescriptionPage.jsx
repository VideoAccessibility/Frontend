import React, {  useState} from "react";
import { Box, Stack, Typography, Grid,  TextField, Button} from "@mui/material";
import {Sidebar,  Player, Scene, SceneCards} from "./";

const EditDescriptionPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Home");

  return (
    // The box is the sidebar
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
    <Box sx={{ height: { sx: "auto", md: "100vh" }, paddingRight: { sx: 0, md: 2 } }}>
      <Sidebar 
        selectedCategory = {selectedCategory}
        setSelectedCategory = {setSelectedCategory}
      />
    </Box>

    {/* This container consists of the video player, the video information for now is hardcoded*/}
    <Grid container spacing={2} paddingTop={2} paddingRight={2}>
        <Grid item xs={12} md={8}>
            <Player/>
        </Grid>

        {/* This grid represent the notes section */}
        <Grid item xs={6} md={4}>
            <Box p={2} sx= {{ backgroundColor : "#1D5B79" , borderRadius : "5px", paddingBottom:"20px"}}>
                <Typography variant="h6" sx={{color : "white"}} >Notes</Typography>
                <hr/>
              <Box sx ={{overflow: "scroll", height : { md: '50vh' }}}>
              <TextField
                id="standard-multiline-static"
                multiline
                rows={20}
                placeholder="Enter your notes here"
                variant="outlined"
                aria-label="Enter your notes in this text area"
                sx={{backgroundColor:"white", width:"100%"}}
                />
              </Box>
            </Box>
        </Grid>
        {/* Look into this display thingy */}
        <Box sx ={{overflow: "scroll", height : { md: '50vh' }}}>
        <SceneCards/>
        </Box>
        
    </Grid>
  
    </Stack>
  )
}

export default EditDescriptionPage;