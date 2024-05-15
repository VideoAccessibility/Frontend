import React, { useState } from "react";
import { AboutCard, Navbar, SideNav, StyledHeading } from "../components";
import { Link } from "react-router-dom";
import { aboutWebsite, people } from "../utils/constants";
import { Box, Typography, Stack } from "@mui/material";

const AboutPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box
        component="main"
        m={2}
        // sx={{ flexGrow: 1, p: 2, paddingTop:10, width: { sm: `calc(100% - ${drawerWidth}px)` }}}
      >
        <StyledHeading text="About Vidscribe" />
        <Typography width={"70%"}>{aboutWebsite[0]}</Typography>
        <br />
        <Typography width={"70%"}>{aboutWebsite[1]}</Typography>
        <br />
        <StyledHeading text="This work is supported by grants from" />
        <Box m={3}>
        <img src="https://www.nih.gov/sites/all/themes/nih/images/nih-logo-color.png" alt="National Institute of Health Logo" width={"30%"}/>
        </Box>

        <StyledHeading text="The team behind Vidscribe" />
        <Stack
          direction={"row"}
          flexWrap="wrap"
          justifyContent="start"
          alignItems="start"
          columnGap={2}
          m={2}
        >
          {people.map((item, idx) => (
            <AboutCard
              key={idx}
              image={item.image}
              name={item.name}
              info={item.info}
              email={item.email}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default AboutPage;
