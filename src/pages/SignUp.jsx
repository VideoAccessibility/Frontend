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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
// Going to use cookies to store the token
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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


const apiUrl = "https://vidscribe.org/b/register/";

export default function SignUp() {
  const [heading, setHeading] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const image = require("../data/create-account-image.png")

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setHeading("Passwords do not match");
      return;
    }

    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get("username"),
      password: data.get("password"),
      user_type: data.get("userType"),
    };

    axios
      .post(apiUrl, credentials)
      .then((response) => {
        // Handle a successful sign-up response
        const token = response.data.token;
        console.log("Sign Up successful! Token:", token);
        Cookies.set("jwtToken", token, { expires: 3 });
        setHeading("Sign Up Successful");
        navigate("/SignUp");
      })
      .catch((error) => {
        // Handle sign-up errors
        console.error("Sign Up failed. Error:", error);
        setHeading("Could not create an account");
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
        
        <Typography variant="h4" sx={{ backgroundColor: 'secondary.main', padding: "0 10px", fontWeight: "bold"}}>Sign up for an account</Typography>
        <Typography variant="body">{heading}</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
              <TextField
                mt={100}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth>
                <InputLabel id="select-user-type">Type of User</InputLabel>
                <Select
                  labelId="select-user-type"
                  required
                  fullWidth
                  id="userType"
                  name="userType"
                  label="User Type"
                >
                  <MenuItem value="blind">Blind and Low Vision User</MenuItem>
                  <MenuItem value="sighted">Sighted Volunteer</MenuItem>
                </Select>
              </FormControl>
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
            aria-label="Create an account on Vidscribe"
          >
            Create Account
          </Button>
          <Grid container justifyContent="center">
          <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
          </Grid>
        </Box>
              <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
  );
}