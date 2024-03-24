import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";
// Going to use cookies to store the token
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://vidscribe.org/b/login/";

export default function SignIn() {
  const [heading, setHeading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get("username"),
      password: data.get("password"),
    };
    // Make the POST request to log in
    axios
      .post(apiUrl, credentials)
      .then((response) => {
        // Handle a successful login response
        const token = response.data.token; // Assuming the server sends back a JWT token
        // make sure not to delete this console.log
        console.log("Logged in successfully. Token:", token);
        Cookies.set("jwtToken", token, { expires: 3 });
        setHeading("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        // Handle login errors, such as incorrect credentials
        console.error("Login failed. Error:", error);
        setHeading("User not found");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body">{heading}</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Your Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="category-btn"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "secondary.main",
              color: "white",
            }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Link href="/SignUp" variant="body2">
              Don't have an account? Sign up for an account.
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
