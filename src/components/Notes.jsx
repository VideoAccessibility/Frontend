import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';

const Notes = ({ videoId }) => {
  const [notes, setNotes] = useState(localStorage.getItem(`notes_${videoId}`) || 'Enter notes here');

  useEffect(() => {
    // Save notes to local storage whenever notes state changes
    localStorage.setItem(`notes_${videoId}`, notes);
  }, [videoId, notes]);

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <Grid item xs={6} md={4}>
      <Box
        p={2}
        sx={{
          backgroundColor: 'primary.light',
          borderRadius: '5px',
          paddingBottom: '20px',
        }}
      >
        <Typography variant="h6" sx={{ color: 'primary.dark' }}>
          Notes
        </Typography>
        <hr />
        <Box sx={{ overflow: 'scroll', height: { md: '50vh' } }}>
          <TextField
            value={notes}
            onChange={handleChange}
            id="standard-multiline-static"
            multiline
            rows={20}
            placeholder="Enter your notes here"
            variant="outlined"
            aria-label="Enter your notes in this text area"
            sx={{ backgroundColor: 'white', width: '100%' }}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default Notes;




// import React from 'react'
// import { Box, Typography, Grid, TextField } from "@mui/material";
// const Notes = () => {
//   const [notes, setNotes] = ("Enter notes here");
//   const handleChange = (e) => {
//     console.log("this is target", e.target.value)
//     // setNotes(e.target.value)
//   }
//   console.log("these the notes", notes)
//   return (
//     <Grid item xs={6} md={4}>
//             <Box
//               p={2}
//               sx={{
//                 backgroundColor: "primary.light",
//                 borderRadius: "5px",
//                 paddingBottom: "20px",
//               }}
//             >
//               <Typography variant="h6" sx={{ color: "primary.dark" }}>
//                 Notes
//               </Typography>
//               <hr />
//               <Box sx={{ overflow: "scroll", height: { md: "50vh" } }}>
//                 <TextField
//                   value={notes}
//                   onChange={handleChange}
//                   id="standard-multiline-static"
//                   multiline
//                   rows={20}
//                   placeholder="Enter your notes here"
//                   variant="outlined"
//                   aria-label="Enter your notes in this text area"
//                   sx={{ backgroundColor: "white", width: "100%" }}
//                 />
//               </Box>
//             </Box>
//           </Grid>
//   )
// }

// export default Notes