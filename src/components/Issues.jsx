import React, {  useState} from "react";
import { Box, Stack, Tab, Grid, Divider} from "@mui/material";
import { TabContext, TabList, TabPanel} from "@mui/lab";
import {Sidebar,  Player, Comment, SceneCards} from "./";
import Comments from "../data/comments";

const Issues = () => {
    const [selectedCategory, setSelectedCategory] = useState("Home");
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        // The box is the sidebar
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box sx={{ height: { sx: "auto", md: "100vh" }, paddingRight: { sx: 0, md: 2 } }}>
          <Sidebar 
            selectedCategory = {selectedCategory}
            setSelectedCategory = {setSelectedCategory}
          />
        </Box>
        <Grid container spacing={2} paddingTop={2} paddingRight={2}>
        <Grid item xs={12} md={10}>
            <Player/>
        </Grid>
    
        {/* This container consists of the video player, the video information for now is hardcoded*/}
        <Grid item margin={2} sx= {{ backgroundColor : "#1D5B79" , borderRadius : "5px", width:"100%"}}>
        <Box>
            <TabContext value = {value}>
                <Box>
                    <TabList aria-label= 'tabs for AI Q&A and AI description' onChange={handleChange} textColor='secondary' indicatorColor="secondary">
                        <Tab label='Description' value='1' />
                        <Tab label='Q&A' value='2' />

                    </TabList>
                </Box>
                {/* this tab shows the description by the AI */}
                <TabPanel value='1'>
                <SceneCards/>
                </TabPanel>
                {/* This tav shows the Q&A */}
                <TabPanel value='2'>
                {Comments.map((item) => (
                <Box>
                <Comment
                  id = {item.id}
                  username = {item.user}
                  question = {item.question}
                  answer = {item.answer}
                  timeStamp = {item.timestamp}
                  /> 
                  <Divider/>
                  </Box>
              ))}
                </TabPanel>
            </TabContext>
        </Box>
        </Grid>
        </Grid>
        </Stack>
  )
}

export default Issues