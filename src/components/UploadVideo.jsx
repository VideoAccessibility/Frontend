import React, {  useState} from "react";
import {Sidebar , Navbar} from "./";
import { Box, Stack, Typography} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LoadingButton from '@mui/lab/LoadingButton';

const UploadVideo = () => {
    const [selectedCategory, setSelectedCategory] = useState("Upload");
    const [loading, setLoading] = React.useState(false);
    const [heading, setHeading] = React.useState("Drag and drop a file you want to upload")
    const [smallHeading, setSmallHeading] = React.useState("Once uploaded and described, your video will be visible on homepage")

    function handleClick() {
        setLoading(true);
        setHeading("Uploading...")
        setSmallHeading("Wait until the video is uploaded.")
    }

    return (
        <div>
        <Navbar/>
        {/*  The box is the sidebar */}
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{ height: { sx: "auto", md: "100vh" }, paddingRight: { sx: 0, md: 2 } }}>
            <Sidebar 
                selectedCategory = {selectedCategory}
                setSelectedCategory = {setSelectedCategory}
            />
            </Box>

            <Stack spacing={2} paddingTop={15} width={"100%"} justifyContent={"flex-start"} alignItems={"center"}>
                <LoadingButton
                    color="secondary"
                    onClick={handleClick}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<FileUploadIcon />}
                    variant="contained"
                    >
                    <span>Upload file</span>
                </LoadingButton>
                <Typography variant="h4" fontWeight="bold" paddingTop={3} color="primary.dark">
                {heading}
                </Typography>
                <Typography variant="caption" fontWeight="bold"  color="primary.dark">
                {smallHeading}
                </Typography>
            </Stack>

            {/* This is for if the user wants to upload a youtube link */}
        </Stack>
        </div>)
}

export default UploadVideo