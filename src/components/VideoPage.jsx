import React, {  useState} from "react";
import { Box, Stack, Typography, Grid, Button, Dialog} from "@mui/material";
import {Sidebar, Comment, Player, AskAI, Navbar} from "./";
import Comments from "../data/comments";

const VideoPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };


  return (
    // The box is the sidebar
    <div>
    <Navbar/>
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
            <Typography variant="h6"  color={"primary.dark"}> 
              "Simple everyday life: Daily vlog - Mushrooms omelette, Korean potatoes side dish, mushrooms rice" 
            </Typography>
            <Typography variant="subtitle2"  color={"primary.dark"}> 
              Video Author: Ashley Dunhill            
            </Typography>
            <hr/>
        </Grid>

        {/* This grid represent the comments asked info, showing this next to the video */}
        <Grid item xs={6} md={4}>
            <Box p={2} sx= {{ backgroundColor : "primary.main" , borderRadius : "5px", paddingBottom:"20px"}}>
                <Typography variant="h6" sx={{color : "primary.dark"}} >InfoBot Q&A</Typography>
                <hr/>
              <Box sx ={{overflow: "scroll", height : { md: '55vh' }}}>
              {Comments.map((item) => (
                <Comment
                  id = {item.id}
                  username = {item.user}
                  question = {item.question}
                  answer = {item.answer}
                  timeStamp = {item.timestamp}
                  /> 
              ))}
              </Box>
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <AskAI/>
            </Dialog>

            <Box p={2} sx= {{ backgroundColor : "primary.main" , borderRadius : "5px", margin : "20px 0"}}>
                <Typography variant="h6" sx={{color : "primary.dark"}} >InfoBot Q&A</Typography>
                <hr/>
                <Button sx= {{backgroundColor: "secondary.main", color : "white", width:"100%", marginTop:"10px"}} className="category-btn" href="/EditDescriptionPage">
                  Add description
                </Button>
                <Button sx= {{backgroundColor:"secondary.main", color : "white", width:"100%", marginTop:"10px"}} className="category-btn" >
                  Generate AI description
                </Button>   
                <Button sx= {{backgroundColor:"secondary.main", color : "white", width:"100%", marginTop:"10px"}} className="category-btn" onClick={handleClickOpen}>
                  Ask infobot
                </Button> 
            </Box>
        </Grid>
    </Grid>
  </Stack>
  </div>
  )
}

export default VideoPage