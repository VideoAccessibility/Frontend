import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";

const TextToSpeech = ({ text, parentCallback, cIndex, pIndex }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (pIndex !== cIndex) {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();

      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.voice = voices.find((v) => v.name === "Google US English");
      newUtterance.pitch = pitch;
      newUtterance.rate = rate;
      newUtterance.volume = volume;
      if (isPaused) {
        setIsPaused(false);
      }
      synth.speak(newUtterance);

      newUtterance.onend = () => {
        parentCallback(cIndex);
      };
      // setIsPaused(false);

      setUtterance(newUtterance);

      return () => {
        synth.cancel();
      };
    }
  }, [text, voice, pitch, rate, volume]);

  const handlePause = () => {
    const synth = window.speechSynthesis;
    setIsPaused(true);
    synth.pause();
  };

  const handleResume = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

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
      {/* <br />
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
      </label> */}

      <br />

      <Button
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          marginTop: "10px",
        }}
        className="category-btn"
        aria-label="Play or pause the descriptions"
        onClick={isPaused ? handleResume : handlePause}
      >
        {isPaused ? "Resume description" : "Pause description"}
      </Button>
      {/* <Button
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          margin: "10px",
        }}
        className="category-btn"
        onClick={handleStop}
      >
        Stop
      </Button> */}
    </div>
  );
};

export default TextToSpeech;
