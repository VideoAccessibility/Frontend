import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box, Chip } from "@mui/material";
import { TextToSpeech } from ".";
import formatTime from "../utils/functions";

const VideoPlayer = (props) => {
  const video = "https://vidscribe.org/b/" + props.path;
  const defaultDescription = {
    descriptions: "No description playing",
    time_stamp_start: "-",
    time_stamp_end: "-"
  };
  const [videoDescriptions, setVideoDescriptions] = useState([defaultDescription]);
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [prevDescriptionIndex, setPrevDescriptionIndex] = useState(0);
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);
  const [playSpeech, setPlaySpeech] = useState(true);

  useEffect(() => {
    const updatedDescriptions = [defaultDescription, ...(props.descrip || [])];
    setCurrentDescriptionIndex(0);
    setVideoDescriptions(updatedDescriptions);
  }, [props.descrip]);

  const debouncedHandleTimeUpdate = useCallback(() => {
    const videoElement = document.getElementById("video");
    if (!videoElement) return;

    const currentTime = Math.floor(videoElement.currentTime);
    props.parentCallback(Math.floor(currentTime));

    if (videoDescriptions.length > 0) {
      const index = videoDescriptions.findIndex(
        (description) => parseInt(description.time_stamp_start) === currentTime
      );

      if (index !== -1 && index !== currentDescriptionIndex && props.yesDesc) {
        setCurrentDescriptionIndex(index);
        videoElement.pause();
      }
    }
  }, [currentDescriptionIndex, videoDescriptions, props.parentCallback]);

  useEffect(() => {
    const videoElement = document.getElementById("video");
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      debouncedHandleTimeUpdate();
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [debouncedHandleTimeUpdate]);

  const handleCallback = (playedIndex) => {
    setPrevDescriptionIndex(playedIndex);
    const videoElement = document.getElementById("video");
    videoElement.play();
  };

  const currentDescription = videoDescriptions[currentDescriptionIndex] || defaultDescription;

  return (
    <div>
      <video id="video" controls width="100%" height="500px">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {console.log("My current index and previous index", currentDescriptionIndex, prevDescriptionIndex)}
      <div>
        <Typography variant="h6" color={"primary.dark"} paddingTop={2}>
          {props.title}
        </Typography>
        <hr />
        {props.yesDesc && <Box
          p={2}
          sx={{
            backgroundColor: "#1D5B79",
            borderRadius: "5px",
            marginBottom: "32px",
          }}
        >
          <Box p={1.5} borderRadius="5px" sx={{ backgroundColor: "white" }}>
            <Chip
              label={formatTime(parseInt(currentDescription.time_stamp_start)) + " - " + formatTime(parseInt(currentDescription.time_stamp_end))}
              sx={{
                backgroundColor: "secondary.light",
                color: "white",
                marginBottom: "20px",
              }}
            />
            <Typography variant="body1" sx={{ color: "#1D5B79" }}>
              {currentDescription.descriptions}
              <hr />
              {currentDescriptionIndex !== 0 && (
                <TextToSpeech
                  text={currentDescription.descriptions}
                  isPlayed={isSpeechPlaying}
                  parentCallback={handleCallback}
                  cIndex={currentDescriptionIndex}
                  pIndex={prevDescriptionIndex}
                />
              )}
            </Typography>
          </Box>
        </Box>}
      </div>
    </div>
  );
};

export default VideoPlayer;



// import React, { useState, useEffect } from "react";
// import { Typography, Box, Chip } from "@mui/material";
// import { TextToSpeech } from ".";
// import formatTime from "../utils/functions";

// const VideoPlayer = (props) => {
//   // const video = require("./" + props.path);
//   const video = "https://vidscribe.org/b/" + props.path;
//   // console.log("this is my video path", video)
//   const defaultDescription = {
//     descriptions: "No description playing",
//     time_stamp_start: "-",
//     time_stamp_end: "-"
//   };
//   // console.log("these are my descriptions in video-player", props.descrip)
//   const [videoDescriptions, setVideoDescriptions] = useState([defaultDescription]);
//   const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
//   const [prevDescriptionIndex, setPrevDescriptionIndex] = useState(0);
//   const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);
//   const [playSpeech, setPlaySpeech] = useState(true);

//   useEffect(() => {
//     // Concatenate the default description with the new descriptions from props
//     const updatedDescriptions = [defaultDescription, ...(props.descrip || [])];
//     setCurrentDescriptionIndex(0)
//     setVideoDescriptions(updatedDescriptions);
//   }, [props.descrip]);

//   useEffect(() => {
//     const videoElement = document.getElementById("video");

//     const handleTimeUpdate = () => {
//       // Ensure videoDescriptions is not empty before accessing properties
//       if (videoDescriptions.length > 0) {
//         const currentTime = Math.floor(videoElement.currentTime);
//         props.parentCallback(Math.floor(currentTime));
//         const index = videoDescriptions.findIndex(
//           (description) => parseInt(description.time_stamp_start) === currentTime
//         );

//         if (index !== -1 && index !== currentDescriptionIndex && props.yesDesc) {
//           setCurrentDescriptionIndex(index);
//           videoElement.pause();
//         }
//       }
//     };

//     videoElement.addEventListener("timeupdate", handleTimeUpdate);

//     return () => {
//       videoElement.removeEventListener("timeupdate", handleTimeUpdate);
//     };
//   }, [currentDescriptionIndex, videoDescriptions, props.parentCallback]);

//   const handleCallback = (playedIndex) => {
//     //played index refers to the speech that was most recently played
//     setPrevDescriptionIndex(playedIndex)
//     const videoElement = document.getElementById("video");
//     videoElement.play();
//   };

//   // Ensure videoDescriptions[currentDescriptionIndex] is defined before accessing its properties
//   const currentDescription = videoDescriptions[currentDescriptionIndex] || defaultDescription;

//   return (
//     <div>
//       <video id="video" controls width="100%" height="500px">
//         <source src={video} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       {console.log("My current index and previous index", currentDescriptionIndex, prevDescriptionIndex)}
//       <div>
//         <Typography variant="h6" color={"primary.dark"} paddingTop={2}>
//           {props.title}
//         </Typography>
//         <hr />
//         {props.yesDesc && <Box
//           p={2}
//           sx={{
//             backgroundColor: "#1D5B79",
//             borderRadius: "5px",
//             marginBottom: "32px",
//           }}
//         >
//           <Box p={1.5} borderRadius="5px" sx={{ backgroundColor: "white" }}>
//             <Chip
//               label={formatTime(parseInt(currentDescription.time_stamp_start)) + " - " + formatTime(parseInt(currentDescription.time_stamp_end))}
//               sx={{
//                 backgroundColor: "secondary.light",
//                 color: "white",
//                 marginBottom: "20px",
//               }}
//             />
//             <Typography variant="body1" sx={{ color: "#1D5B79" }}>
//               {currentDescription.descriptions}
//               <hr />
//               {currentDescriptionIndex !== 0 && (
//                 <TextToSpeech
//                   text={currentDescription.descriptions}
//                   isPlayed={isSpeechPlaying}
//                   parentCallback={handleCallback}
//                   cIndex = {currentDescriptionIndex}
//                   pIndex = {prevDescriptionIndex}
//                 />
//               )}
//             </Typography>
//           </Box>
//         </Box>}
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
