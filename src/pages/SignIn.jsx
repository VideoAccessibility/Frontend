import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from "axios";
// Going to use cookies to store the token
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://vidscribe.org/b/login/";
// const apiUrl = "http://127.0.0.1:8000/login/";

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://vidscribe.org/">
          ViDscribe
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


export default function SignIn() {
  const [heading, setHeading] = useState("");
  const navigate = useNavigate();
  const image = require("../data/welcome-back-img.png")

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
        const token = response.data.token;
        // console.log("Logged in successfully. Token:", token);
        //setting an expiry of 3 days for the token in cookies storage
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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          margin={4}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '40px'
          }}
        >
            
        </Grid>
        <Grid item xs={12} sm={8} md={5} marginY={4} borderRadius='40px' component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        
        <Avatar alt="an icon of a lock" sx={{ m: 3, bgcolor: "secondary.main", width: 80, height: 80 }}>
          <LockOutlinedIcon sx={{ fontSize: 50 , color:'primary.dark'}}/>
        </Avatar>
        <Typography variant="h4" sx={{ backgroundColor: 'secondary.main', padding: "0 10px", fontWeight: "bold"}}>Sign in to your account</Typography>
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
            variant="contained"
            fullWidth
            className="category-btn"
            sx={{
              mt: 3,
              mb: 3,
              p:1,
              borderRadius:"30px",
              fontSize:"large"
            }}
            aria-label="Sign In to your account on Vidscribe"
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Link href="/SignUp" variant="body1">
              Don't have an account? Sign up for an account.
            </Link>
          </Grid>
        </Box>
              <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
  );
}
