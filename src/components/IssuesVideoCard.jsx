import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from '@mui/icons-material/Flag';

const IssuesVideoCard = (props) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "270px" },
        boxShadow: "none",
        borderRadius: "10px",
      }}
    >
      <Link to={props.url}>
        <CardMedia
          image={props.image}
          sx={{
            width: { xs: "100%", sm: "358px" },
            height: 180,
          }}
        />
      </Link>

      <CardContent
        sx={{
          backgroundColor: "#1D5B79",
          height: "120px",
        }}
      >
        <Link to={props.url}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {/* The slice function is  used to reduce the title length to 60*/}
            {props.title.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={props.url}>
          <Typography variant="subtitle2" color="#468B97">
            {props.channelTitle}
            <CheckCircleIcon
              sx={{ fontSize: "12px", color: "#468B97", ml: "5px" }}
            />
          </Typography>

          {/* This is hard coded for now, just displays two tage that the video is AI generated or human generated */}
          <Grid container paddingTop={1} justifyContent={"space-between"}>
            <Typography
              fontSize="0.75rem"
              color="white"
              backgroundColor="secondary.main"
              padding="3px 20px"
              borderRadius="5px"
            >
              Edit
            </Typography>

            <Typography variant="subtitle2" color="primary.light">
            <FlagIcon
              sx={{ fontSize: "12px", color: "#468B97", ml: "5px" }}
            />
            {props.flag}
          </Typography>
            
          </Grid>
        </Link>
      </CardContent>
    </Card>
  );
};

export default IssuesVideoCard;
