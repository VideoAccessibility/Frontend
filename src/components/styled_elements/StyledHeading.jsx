import React from 'react'
import {
    Box,
    Typography,
  } from "@mui/material";

const StyledHeading = ({text}) => {
  return (
    <Box
              mb={2}
              sx={{
                backgroundColor: "secondary.main",
                p: "0 10px",
                display: "inline-block",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {text}
              </Typography>
            </Box>
  )
}

export default StyledHeading