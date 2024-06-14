import React, { useState, useEffect } from "react";
import {
    YoutubeVideoPlayer,
  } from "./";

const YoutubeOrLocal = (props) => {
    const [isYoutube, setIsYoutube] = useState(false);
    const [videoId, setVideoId] = useState("");

    useEffect(() => {
        if (props.url !== "") {
            const match = props.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|.*[&?]))([^&?\s]+)/);
            if (match && match[1]) {
                setVideoId(match[1]);
                setIsYoutube(true);
            }
        }
    }, [props.url]);
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
                videoId = {videoId}
              />
    }
    </>
  )
}

export default YoutubeOrLocal