import React, { useCallback, useState, useEffect } from "react";
import {AlertBar} from './';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  ButtonGroup,
  DialogTitle,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import formatTime from "../utils/functions";
import tokenUsable from "../utils/loggedIn";

const AskAI = (props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [startOrStop, setStartOrStop] = React.useState("Stop");
  const [alerttext, setAlerttext] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const playBeep = (type) => {
    var audioStart = new Audio(require('../data/beepStop.mp3')) 
    if (type === "start"){
      audioStart = new Audio(require('../data/beepStart.mp3')) 
    }
    audioStart.play()
  };

  const textToSpeech = () => {
    const synth = window.speechSynthesis;
    const newUtterance = new SpeechSynthesisUtterance(transcript);
    const voices = synth.getVoices();
    newUtterance.voice = voices.find((v) => v.name === "Google US English");
    synth.speak(newUtterance);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the pressed key is "Q" and if the dialog is not already open
      if (event.key === "q" && !open) {
        handleClickOpen();
      }
      else if (event.key === "s" && open) {
        handleStartStop();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [open]); 

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleCloseAlertCallback = () => {
    setShowAlert();
  };

  const handleClickOpen = () => {
    const token = Cookies.get("jwtToken");
    if (!token || !tokenUsable(token)){
      setShowAlert(true)
      setAlerttext("to ask questions")
      return
    }

    SpeechRecognition.startListening({continuous:true});
    playBeep("start");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    synth.cancel();
    SpeechRecognition.stopListening()
    setResponse("")
    resetTranscript();
    setStartOrStop("Stop")
  };

  const handleAnotherQuestion = () => {
    setResponse("")
    resetTranscript();
  }

  const handleReset = () => {
    resetTranscript();
    SpeechRecognition.startListening({continuous:true});
    setStartOrStop("Stop");
    playBeep("start");
  }

  const handleStartStop = () => {
    if (startOrStop === "Stop"){
      SpeechRecognition.stopListening()
      setStartOrStop("Start")
      playBeep("stop");
    }
    else{
      SpeechRecognition.startListening({continuous:true})
      setStartOrStop("Stop")
      playBeep("start");
    }

  }

  const handleQuestion = () => {
    setLoading(true);
    const token = Cookies.get("jwtToken");
    // Define the API endpoint where you want to send the POST request
    const apiUrl = "https://vidscribe.org/b/api/ask_question/";
    console.log("This is my props id", props.videoID);
    const postData = {
      id: props.videoID,
      question: transcript,
      currentTime: props.timeStamp,
      jwt: token,
    };

    axios
      .post(apiUrl, postData)
      .then((response) => {
        // Handle the successful response
        console.log("Response:", response.data);
        const newUtterance = new SpeechSynthesisUtterance("Response: "+ response.data.answer);
        newUtterance.voice = voices.find((v) => v.name === "Google US English");
        synth.speak(newUtterance);
        setResponse(response.data.answer);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
      });
  };

  return (
    <React.Fragment>
    {showAlert && 
      <AlertBar 
      alertText={"You need to have an account "+alerttext}
      parentCallback={handleCloseAlertCallback}
      />}
      <Button
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          width: "100%",
          marginTop: "10px",
        }}
        className="category-btn"
        onClick={handleClickOpen}
      >
        Ask question at {formatTime(props.timeStamp)}
      </Button>
      {(loading || response) && (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          sx={{ textAlign: "center" }}
        >
          <KeyboardVoiceIcon
            sx={{
              fontSize: "70px",
              backgroundColor: "#1D5B79",
              color: listening ? "#EF6262" : "white",
              ml: "5px",
              borderRadius: "100%",
              padding: "20px",
              margin: "20px auto",
            }}
          />
          <DialogTitle>
            {!response ? "Retrieving Response" : "Response"}
          </DialogTitle>
          <DialogContent>
            {loading && <CircularProgress />}
            {response && <DialogContentText>Response: {response}</DialogContentText>}
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
              }}
              className="category-btn"
              onClick={handleAnotherQuestion}
            >
              Ask another question
            </Button>
            <Button
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
              }}
              className="category-btn"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {!loading && !response && (
        <Dialog open={open} onClose={handleClose} sx={{ textAlign: "center" }}>
          <KeyboardVoiceIcon
            sx={{
              fontSize: "70px",
              backgroundColor: "#1D5B79",
              color: listening ? "#EF6262" : "white",
              ml: "5px",
              borderRadius: "100%",
              padding: "20px",
              margin: "20px auto",
            }}
          />
          <DialogTitle>Ask Your Question</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-textarea"
              label="Your Question"
              placeholder="Your question will be visible here"
              multiline
              value={transcript}
              fullWidth
              disabled
              sx={{ margin: "20px 0" }}
            />
            <ButtonGroup aria-label="Buttons to control speech recognition">
              <Button
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                }}
                aria-label = "This is a button for start or stopping the speech to text"
                className="category-btn"
                onClick={handleStartStop}
              >
                {startOrStop}
              </Button>
              <Button
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                }}
                className="category-btn"
                onClick={textToSpeech}
              >
                Text To Speech
              </Button>
              <Button
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                }}
                className="category-btn"
                onClick={handleReset}
              >
                Reset Question
              </Button>
            </ButtonGroup>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
              }}
              className="category-btn"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
              }}
              onClick={handleQuestion}
            >
              Submit Question
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default AskAI;
