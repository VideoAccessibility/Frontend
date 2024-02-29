// // import { useState, useEffect } from 'react';

// // function useSpeechRecognition() {
// //   const [transcript, setTranscript] = useState('');
// //   const [listening, setListening] = useState(false);

// //   const recognition = new window.SpeechRecognition();
// //   recognition.continuous = true;
// //   recognition.lang = 'en-US';

// //   useEffect(() => {
// //     recognition.onstart = () => {
// //       console.log('Speech recognition started');
// //       setListening(true);
// //     };

// //     recognition.onresult = (event) => {
// //       const currentTranscript = event.results[event.results.length - 1][0].transcript;
// //       setTranscript(currentTranscript);
// //     };

// //     recognition.onend = () => {
// //       console.log('Speech recognition ended');
// //       setListening(false);
// //     };

// //     recognition.onerror = (event) => {
// //       console.error('Speech recognition error occurred:', event.error);
// //       setListening(false);
// //     };

// //     return () => {
// //       recognition.stop();
// //     };
// //   }, []); // Empty dependency array ensures that this effect runs once after the initial render

// //   const startListening = () => {
// //     recognition.start();
// //   };

// //   const stopListening = () => {
// //     recognition.stop();
// //   };

// //   return {
// //     listening,
// //     transcript,
// //     startListening,
// //     stopListening,
// //   };
// // }

// // export default useSpeechRecognition;



// import React, { useEffect, useState } from "react";

// let recognition: any = null;
// if ("webkitSpeechRecongition" in window) {
//   recognition = new webkitSpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = "en-US";
// }

// const useSpeechRecognition = () => {
//   const [text, setText] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     if (!recognition) return;

//     recognition.onresult = (event) => {
//       console.log("on result event: ", event);
//       recognition.stop();
//       setIsListening(false);
//     };
//   }, []);

//   const startListening = () => {
//     setText("");
//     setIsListening(true);
//     recognition.start();
//   }

//   const stopListening = () => {
//     setIsListening(false);
//     recognition.stop();
//   }

//   return {
//     text,
//     isListening,
//     startListening,
//     stopListening,
//     hasRecognition: !!recognition, 
//   }
// };

// export default useSpeechRecognition;
