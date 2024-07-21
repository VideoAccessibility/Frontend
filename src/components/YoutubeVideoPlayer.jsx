import React, { useEffect, useState } from "react";
import {Grid} from "@mui/material";
import {
  DisplayDescriptions,
  StyledHeading,
} from "../components/";
import YouTube from "react-youtube";

const YoutubeVideoPlayer = (props) => {
  // console.log("Props in  youtube",props)
  const [player, setPlayer] = useState(null);
  const [videoDescriptions, setVideoDescriptions] = useState([]);
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [prevDescriptionIndex, setPrevDescriptionIndex] = useState(0);
  const [isPlaying, setIsplaying] = useState(null);
  const [time, setTime] = useState(0);
  const defaultDescription = {
    descriptions: "No description playing",
    time_stamp_start: "-",
    time_stamp_end: "-",
  };

  useEffect(() => {
    // Concatenate the default description with the new descriptions from props
    const updatedDescriptions = [defaultDescription, ...(props.descrip || [])];
    setCurrentDescriptionIndex(0);
    setVideoDescriptions(updatedDescriptions);
  }, [props.descrip]);

  useEffect(() => {
    if (player) {
      const handleStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
          // Video is playing
          console.log("Video is playing");
          const intervalId = setInterval(() => {
            const currentTime = Math.floor(player.getCurrentTime());
            setTime(currentTime);

            if (videoDescriptions.length > 0) {
              const index = videoDescriptions.findIndex(
                (description) =>
                  parseInt(description.time_stamp_start) === currentTime
              );

              if (
                index !== -1 &&
                index !== currentDescriptionIndex &&
                props.yesDesc
              ) {
                setCurrentDescriptionIndex(index);
                player.pauseVideo();
              }
            }
          }, 1000);

          // Clean up interval when video is paused or ended
          player.addEventListener("onStateChange", (event) => {
            if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED ||
              videoDescriptions.length <= 1
            ) {
              clearInterval(intervalId);
            }
          });
        }
      };

      // Add event listener for state changes
      player.addEventListener("onStateChange", handleStateChange);

      // Clean up event listener on component unmount
      return () => {
        player.removeEventListener("onStateChange", handleStateChange);
      };
    }
  }, [
    player,
    currentDescriptionIndex,
    videoDescriptions,
    props.parentCallback,
    props.yesDesc,
    props.playVid,
  ]);

  const handleResumeDescriptionCallback = (playedIndex) => {
    setCurrentDescriptionIndex(playedIndex);
    if (player) {
      player.playVideo();
    }
  };

  // Ensure videoDescriptions[currentDescriptionIndex] is defined before accessing its properties
  const currentDescription =
    videoDescriptions[currentDescriptionIndex] || defaultDescription;
  // console.log("This is the current description", currentDescription);
  props.parentCallback(time, currentDescription.descriptions, !isPlaying);

  const onReady = (e) => {
    setPlayer(e.target);
  };

  return (
    <div>
      <YouTube
        videoId={props.videoID}
        containerClassName="embed embed-youtube"
        opts={{
          width: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={onReady}
      />
      {props.yesDesc && <Grid mt={2}>
        <StyledHeading text={props.title} />
        <DisplayDescriptions
          description={currentDescription}
          parentCallback={handleResumeDescriptionCallback}
          cIndex = {currentDescriptionIndex}
          pIndex = {prevDescriptionIndex}
        />
      </Grid>}
    </div>
  );
};

export default YoutubeVideoPlayer;