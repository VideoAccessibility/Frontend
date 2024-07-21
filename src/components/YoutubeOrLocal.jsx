import React, { useState, useEffect } from "react";
import {
    YoutubeVideoPlayer,
  } from "./";

const YoutubeOrLocal = (props) => {
    const [isYoutube, setIsYoutube] = useState(false);
    // const [videoId, setVideoId] = useState("");

    useEffect(() => {
      if (props.videoID !== "") {
          console.log("Props in local",props)
              setIsYoutube(true);
          }
  }, [props.videoID]);


    // useEffect(() => {
    //     if (props.videoID !== "") {
    //         const match = props.videoID.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|.*[&?]))([^&?\s]+)/);
    //         if (match && match[1]) {
    //             setVideoId(match[1]);
    //             setIsYoutube(true);
    //         }
    //         console.log("This is the url", match[1])
    //     }
    // }, [props.videoID]);
  return (
    <>
    {isYoutube && 
    <YoutubeVideoPlayer
                yesDesc={props.yesDesc}
                path={props.path}
                playVid = {props.playVid}
                title={props.title}
                descrip={props.descrip}
                parentCallback={props.parentCallback}
                videoId = {props.videoID}
              />
    }
    </>
  )
}

export default YoutubeOrLocal