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
        <StyledHeading text="About ViDScribe" />
        <Typography width={"70%"}>{aboutWebsite[0]}</Typography>
        <br />
        <Typography width={"70%"}>{aboutWebsite[1]}</Typography>
        <br />
        <StyledHeading text="People" />
        <Stack
          direction={"row"}
          flexWrap="wrap"
          justifyContent="start"
          alignItems="start"
          columnGap={2}
          m={2}
          mb={4}
        >
          {people.map((item, idx) => (
            <AboutCard
              key={idx}
              image={item.image}
              name={item.name}
              info={item.info}
              email={item.email}
              site={item.site}
              zoom={item.zoom}
            />
          ))}
        </Stack>
        <StyledHeading text="Sponsors" />
        <Box m={3}>
        <img src="https://www.nei.nih.gov/themes/custom/nei/images/NEI-logo-tagline.svg" alt="National Institute of Health Logo" width={"30%"}/>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
