import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Button, TextField, Alert, AlertTitle, Snackbar } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { SideNav } from "../components/";
import UploadDialog from "../components/UploadDialog";

const drawerWidth = 200;

function tokenUsable(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
}

const UploadVideo = () => {
  const [selectedCategory, setSelectedCategory] = useState("Upload");
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState("Add a video title and upload video file");
  const [smallHeading, setSmallHeading] = useState("Once uploaded and described, your video will be visible on homepage");
  const [visibility, setVisibility] = useState("public");
  const [selectedFile, setSelectedFile] = useState();
  const [videoTitle, setVideoTitle] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleFileSelect = (e) => {
    if (!e.target.files) {
      return;
    }
    setSelectedFile(e.target.files[0]);
    const token = Cookies.get("jwtToken");

    if (!token) {
      setAlertOpen(true);
      return;
    }

    setUploadDialogOpen(true);
  };

  const handleFileUpload = () => {
    const token = Cookies.get("jwtToken");

    if (!token) {
      setAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("jwt", token);
    formData.append("file", selectedFile);
    formData.append("title", videoTitle);
    formData.append("public_or_private", visibility);

    setHeading("Your file is being loaded, do not refresh page.");
    setSmallHeading("You will be redirected to the video page when the video is described");
    setLoading(true);
    const url = "https://vidscribe.org/b/api/upload/";
    // const url = "http://127.0.0.1:8000/api/upload/";
    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setUploadDialogOpen(false);
        setLoading(false);
        // navigate("/"); // Removed this line, as dialog confirmation might lead to a different navigation flow
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setHeading("Error in uploading your file, please try again");
        setSmallHeading("Make sure, you are uploading an mp4 file");
      });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Box backgroundColor={"white"} p={2} width={{ xs: "100%", md: "45%" }} boxShadow={3}>
            <Box mb={2} sx={{ backgroundColor: "secondary.main", p: "0 10px", display: "inline-block" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>Add video title</Typography>
            </Box>
            {!loading && (
              <TextField
                label="Video Title"
                variant="outlined"
                value={videoTitle}
                fullWidth
                onChange={handleTitleChange}
              />
            )}
          </Box>
          <Box backgroundColor={"white"} p={2} width={{ xs: "100%", md: "45%" }} boxShadow={3} mt={2}>
            <Box mb={2} sx={{ backgroundColor: "secondary.main", p: "0 10px", display: "inline-block" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>Upload Video</Typography>
            </Box>
            <br />
            <Button
              type="submit"
              variant="contained"
              component="label"
              className="category-btn"
              sx={{ mt: 1, mb: 1, p: "10px 20px", borderRadius: "30px", fontSize: "large" }}
              aria-label="Upload a video on Vidscribe"
              startIcon={<FileUploadIcon />}
              disabled={loading || videoTitle.trim() === ""}
            >
              Upload Video File
              <input type="file" accept=".mp4" hidden onChange={handleFileSelect} />
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleAlertClose}>
          <AlertTitle>Authentication Error</AlertTitle>
          You need to be logged in to upload a video.
        </Alert>
      </Snackbar>
      <UploadDialog
        open={uploadDialogOpen}
        setOpen={setUploadDialogOpen}
        onConfirm={handleFileUpload}
      />
    </>
  );
};

export default UploadVideo;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Navbar, SideNav } from "../components/";
// import {
//   Box,
//   Stack,
//   Typography,
//   Button,
//   CircularProgress,
//   InputAdornment,
//   TextField,
//   Alert,
//   AlertTitle,
//   Snackbar,
// } from "@mui/material";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import UploadDialog from "../components/UploadDialog"; // Import the UploadDialog component

// const drawerWidth = 200;

// function tokenUsable(token) {
//   // User is not logged in, display Material-UI Alert
//   const decodedToken = jwtDecode(token);
//   const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

//   // Check if the token is not expired
//   return decodedToken.exp > currentTime;
// }

// const UploadVideo = () => {
//   const [selectedCategory, setSelectedCategory] = useState("Upload");
//   const [loading, setLoading] = React.useState(false);
//   const [heading, setHeading] = React.useState(
//     "Add a video title and upload video file"
//   );
//   const [smallHeading, setSmallHeading] = React.useState(
//     "Once uploaded and described, your video will be visible on homepage"
//   );
//   const [visibility, setVisibility] = useState("public");
//   const [selectedFile, setSelectedFile] = useState();
//   const [videoTitle, setVideoTitle] = useState("");
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [uploadDialogOpen, setUploadDialogOpen] = useState(false); // State for upload dialog

//   const navigate = useNavigate();

//   const handleTitleChange = (event) => {
//     setVideoTitle(event.target.value);
//   };

//   const handleAlertClose = () => {
//     setAlertOpen(false);
//   };

//   const handleFileUpload = (e) => {
//     if (!e.target.files) {
//       return;
//     }
//     setSelectedFile(e.target.files[0]);
//     const token = Cookies.get("jwtToken");

//     if (!token) {
//       setAlertOpen(true);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("jwt", token);
//     formData.append("file", e.target.files[0]);
//     formData.append("title", videoTitle);
//     formData.append("public_or_private", visibility);

//     console.log("This is my form data", visibility);

//     // Define the API endpoint where you want to send the POST request
//     const apiUrl = "https://vidscribe.org/b/api/upload/";

//     // Seting the page to loading
//     setHeading("Your file is being loaded, do not refresh page.");
//     setSmallHeading(
//       "You will be redirected to the video page when the video is described"
//     );
//     setLoading(true);

//     axios
//       .post(apiUrl, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Use ‘multipart/form-data’ for file uploads
//         },
//       })
//       .then((response) => {
//         // Handle the successful response
//         console.log("Response:", response.data);
//         setUploadDialogOpen(true); // Open the upload dialog
//         setLoading(false);
//         // navigate("/"); // Removed this line, as dialog confirmation might lead to a different navigation flow
//       })
//       .catch((error) => {
//         // Handle errors, if any
//         console.error("Error:", error);
//         setLoading(false);
//         setHeading("Error in uploading your file, please try again");
//         setSmallHeading("Make sure, you are uploading an mp4 file");
//       });
//   };

//   return (
//     <>
//       {/* <div className="pattern"> */}
      
//       <Box sx={{ display: "flex" }}>
//       <SideNav/>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 2,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Box
//             backgroundColor={"white"}
//             p={2}
//             width={{ xs: "100%", md: "45%" }}
//             boxShadow={3}
//           >
//             <Box
//               mb={2}
//               sx={{
//                 backgroundColor: "secondary.main",
//                 p: "0 10px",
//                 display: "inline-block",
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 Add video title
//               </Typography>
//             </Box>
//             {!loading && (
//               <TextField
//                 label="Video Title"
//                 variant="outlined"
//                 value={videoTitle}
//                 fullWidth
//                 onChange={handleTitleChange}
//               />
//             )}
//           </Box>
//           <Box
//             backgroundColor={"white"}
//             p={2}
//             width={{ xs: "100%", md: "45%" }}
//             boxShadow={3}
//             mt={2}
//           >
//             <Box
//               mb={2}
//               sx={{
//                 backgroundColor: "secondary.main",
//                 p: "0 10px",
//                 display: "inline-block",
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 Upload Video
//               </Typography>
//             </Box>
//             <br/>
//             <Button
//                 type="submit"
//                 variant="contained"
//                 component="label"
//                 className="category-btn"
//                 sx={{
//                   mt: 1,
//                   mb: 1,
//                   p: "10px 20px",
//                   borderRadius: "30px",
//                   fontSize: "large",
//                 }}
//                 aria-label="Upload a video on Vidscribe"
//                 startIcon={<FileUploadIcon />}
//                 disabled={loading || videoTitle.trim() === ""}
//               >
//                 Upload Video File
//                 <input
//                   type="file"
//                   accept=".mp4"
//                   hidden
//                   onChange={handleFileUpload}
//                 />
//               </Button>
//           </Box>
//         </Box>
//       </Box>
//       <div>
//         <Snackbar
//           open={alertOpen}
//           autoHideDuration={6000}
//           onClose={handleAlertClose}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert severity="error" onClose={handleAlertClose}>
//             <AlertTitle>Authentication Error</AlertTitle>
//             You need to be logged in to upload a video.
//           </Alert>
//         </Snackbar>
//         {/*  The box is the sidebar */}
//         <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
//           <Box
//             sx={{
//               height: { sx: "auto", md: "100vh" },
//               paddingRight: { sx: 0, md: 2 },
//             }}
//           ></Box>
//         </Stack>
//       </div>
//       {/* Add UploadDialog component */}
//       <UploadDialog open={uploadDialogOpen} setOpen={setUploadDialogOpen} />
//     </>
//   );
// };

// export default UploadVideo;
