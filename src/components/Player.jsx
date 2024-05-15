import {React , useState, useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';
import { Box, Grid, Typography, Paper } from "@mui/material";
import { TextToSpeech } from "./";

const Player = (props) => {
    const [played, setPlayed] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const video = "https://vidscribe.org/b/" + props.path; 
    // const video = "http://127.0.0.1:8000/" + props.path;
    // console.log("this is my video path", video)
    const playerRef = props.playerRef;

      // Function to seek to a specific timestamp
    const seekToTimestamp = (timestamp) => {
      if (playerRef.current) {
        playerRef.current.seekTo(timestamp, 'seconds');
      }
    };
    useEffect(() => {
      // Notify the parent component about the played timestamp
      props.parentCallback(played);
    }, [played]);

    return(
    <ReactPlayer 
    ref={playerRef}
    url={video}
    playing={isPlaying}
    controls={true} 
    width={"100%"}
    onProgress={(progress) => {
       setPlayed(Math.floor(progress.playedSeconds));
     }}
    />
    )
}

export default Player;