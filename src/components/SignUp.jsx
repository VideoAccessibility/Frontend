import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        ViDscribe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const apiUrl = "https://vidscribe.org/b/register/";// "https://vidscribe.org/b/register/";

export default function SignUp() {
  const [heading, setHeading] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography variant="body">{heading}</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "secondary.main",
              color: "white",
            }}
            className="category-btn"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}


// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { FormControl, InputLabel } from "@mui/material";
// import axios from "axios";
// // Going to use cookies to store the token
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="/">
//         ViDscribe
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const apiUrl = "http://127.0.0.1:8000/register/";

// export default function SignUp() {
//   const [heading, setHeading] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const credentials = {
//       username: data.get("username"),
//       password: data.get("password"),
//       user_type: data.get("userType"), // Added user type
//     };

//     axios
//       .post(apiUrl, credentials)
//       .then((response) => {
//         // Handle a successful login response
//         const token = response.data.token; // Assuming the server sends back a JWT token
//         // make sure not to delete this console.log
//         console.log("Sign Up successful! Token:", token);
//         Cookies.set("jwtToken", token, { expires: 3 });
//         setHeading("Sign Up Successful");
//         navigate("/");
//       })
//       .catch((error) => {
//         // Handle login errors, such as incorrect credentials
//         console.error("Sign Up failed. Error:", error);
//         setHeading("Could not create an account");
//       });

//     // Send data via Axios to the backend
//     // Your Axios logic goes here
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <Typography variant="body">{heading}</Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 id="username" 
//                 label="Username" 
//                 name="username" 
//                 autoComplete="username" 
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="new-password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="select-user-type">Type of User</InputLabel>
//                 <Select
//                   labelId="select-user-type"
//                   required
//                   fullWidth
//                   id="userType"
//                   name="userType"
//                   label="User Type"
//                 >
//                   <MenuItem value="blind">Blind and Low Vision User</MenuItem>
//                   <MenuItem value="sighted">Sighted Volunteer</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             sx={{
//               mt: 3,
//               mb: 2,
//               backgroundColor: "secondary.main",
//               color: "white",
//             }}
//             className="category-btn"
//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="center">
//             <Grid item>
//               <Link href="/SignIn" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//       <Copyright sx={{ mt: 5 }} />
//     </Container>
//   );
// }
