import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";

const TextToSpeech = ({ text, parentCallback }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.voice = voices.find((v) => v.name === "Google US English");
    newUtterance.pitch = pitch;
    newUtterance.rate = rate;
    newUtterance.volume = volume;

    if (!isPaused) {
      synth.speak(newUtterance);

      newUtterance.onend = () => {
        parentCallback();
      }
    }

    setUtterance(newUtterance);

    return () => {
      synth.cancel();
    };
  }, [text, voice, pitch, rate, volume, isPaused]);

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    const synth = window.speechSynthesis;
    synth.resume();
    setIsPaused(false);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
  };

  // const handleVoiceChange = (event) => {
  //   const selectedVoice = event.target.value;
  //   setVoice(selectedVoice);
  //   console.log("This is the chosen voice.",event.target.value)
  // };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div>
      {/* <label>
        Voice:
        <select value={voice} onChange={handleVoiceChange}>
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label> */}

      <br />

      <label>
        Speed:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </label>
      <br />
      <label>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>

      <br />

      <Button
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          margin: "10px",
        }}
        className="category-btn"
        onClick={isPaused ? handleResume : handlePause}
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
      <Button
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          margin: "10px",
        }}
        className="category-btn"
        onClick={handleStop}
      >
        Stop
      </Button>
    </div>
  );
};

export default TextToSpeech;
