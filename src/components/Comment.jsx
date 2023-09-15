import { Typography, Grid } from '@mui/material'
import React from 'react'

const Comment = (props) => {
  return (
    <Grid container p={2}>
    {/* This grid displays username */}
    <Grid item xs={8} md={10}>
       <Typography variant="subtitle2" sx={{color : "#468B97"}}>{props.username}</Typography>
    </Grid>
    
    {/* this grid displays timestamp */}
    <Grid item xs={4} md={2}>
            <Typography variant="subtitle2" color="white" backgroundColor="#EF6262" padding="3px" borderRadius="5px">
            {props.timeStamp}
            </Typography>
    </Grid>
    {/* This grid displays the question and answer */}
    <Grid item xs={12}>
       <Typography variant="subtitle2" sx={{color : "primary.dark"}}>Question:  {props.question}</Typography>
       <Typography variant="subtitle2" sx={{color : "primary.dark"}} >Answer: {props.answer}</Typography>
    </Grid>
</Grid>
  )
}

export default Comment;