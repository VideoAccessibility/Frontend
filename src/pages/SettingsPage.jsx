import React, { useState } from "react";
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { Navbar, SideNav, StyledHeading } from "../components";

const drawerWidth = 240;

const SettingsPage = () => {
  const [frequency, setFrequency] = useState("5");
  const [detail, setDetail] = useState("characterDetail");
  const [interpretation, setInterpretation] = useState("no");

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const handleInterpretationChange = (event) => {
    setInterpretation(event.target.value);
  };

  const handleSubmit = () => {
    const settings = {
      frequency,
      detail,
      interpretation,
    };
    console.log("Settings saved:", settings);
    // You can replace the console.log with an API call to save the settings
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav/>
      <Box
        component="main"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, height:"100vh" }}
      >
        <Navbar/>
        <Box m={2}  p={2} boxShadow={3} width={{ xs: "100%", md: "45%" }} sx={{ backgroundColor: 'white'}}>
          <StyledHeading text={"Settings for AI Audio Descriptions"}/>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Frequency of Audio Descriptions</FormLabel>
            <RadioGroup
              aria-label="frequency"
              name="frequency"
              value={frequency}
              onChange={handleFrequencyChange}
            >
              <FormControlLabel value="5" control={<Radio />} label="5 seconds" />
              <FormControlLabel value="10" control={<Radio />} label="10 seconds" />
              <FormControlLabel value="15" control={<Radio />} label="15 seconds" />
            </RadioGroup>
          </FormControl>
            <br/>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Type of Detail</FormLabel>
            <RadioGroup
              aria-label="detail"
              name="detail"
              value={detail}
              onChange={handleDetailChange}
            >
              <FormControlLabel value="characterDetail" control={<Radio />} label="Character Detail" />
              <FormControlLabel value="environmentDetail" control={<Radio />} label="Environment Detail" />
              <FormControlLabel value="mainFocus" control={<Radio />} label="Main Focus" />
            </RadioGroup>
          </FormControl>
          <br/>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Interpretation</FormLabel>
            <RadioGroup
              aria-label="interpretation"
              name="interpretation"
              value={interpretation}
              onChange={handleInterpretationChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <br/>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Settings
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
