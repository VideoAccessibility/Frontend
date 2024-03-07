import React, { useState, useEffect } from "react";
import { Typography, Grid, Chip } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import formatTime from "../utils/functions";

const Comment = (props) => {
  const apiUrl = "https://vidscribe.org/api/ask_question/";
  const token = Cookies.get("jwtToken");
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // error handling check
  const [noComments, setNoComments] = useState(false);

  useEffect(() => {
    const params = {
      id: props.videoID,
    };

    axios
      .get(apiUrl, {
        params: params,
      })
      .then((response) => {
        // checking if the api call is returning NOT_Found or an array
        if (!Array.isArray(response.data.questions)){
          setNoComments(true)
      }
      else{
        // console.log("Response data:", response.data.questions);
        setComments(
          response.data.questions.map((item) => {
            return JSON.parse(item);
          })
        );
      }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching comments:", err);
        setLoading(false);
      });
  }, []); // Dependency array ensures the effect runs when token changes
  console.log(isLoading, noComments)
  if (isLoading || noComments) {
    return (
      <Typography variant="subtitle2" sx={{ color: "#468B97" }}>
        No comments to display
      </Typography>
    );
  }
  // Reverse the array to display comments in a Last In, First Out (LIFO) order
  const reversedComments = [...comments].reverse();

  return (
    <div>
      {reversedComments.map((comment, index) => (
        <Grid container p={2} key={index}>
          <Grid item xs={8} md={9}>
            <Typography variant="subtitle2" sx={{ color: "#468B97" }}>
              @{comment.username}
            </Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Chip
              label={formatTime(parseInt(comment.time_stamp))}
              sx={{
                backgroundColor: "secondary.light",
                color: "white",
                marginBottom: "20px",
              }}
            />
          </Grid>
          <Typography variant="subtitle2" sx={{ color: "primary.dark" }}>
              Question: {comment.question}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "primary.dark" }}>
              Answer: {comment.answer}
            </Typography>
        </Grid>
      ))}
    </div>
  );
};

export default Comment;
