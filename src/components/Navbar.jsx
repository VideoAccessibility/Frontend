import { Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logo } from '../utils/constants';
import SearchBar from './SearchBar';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = Cookies.get('jwtToken');
  let isLoggedIn = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = new Date(); // Convert milliseconds to seconds

    // Check if the token is not expired
    isLoggedIn = decodedToken.exp * 1000 > currentTime.getTime();
    isLoggedIn = true;
  }

  const logout = () => {
    // Clear the JWT token from cookies
    Cookies.remove('jwtToken');
    window.location.reload();
};
  return(
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position:  "sticky",
      background: '#D9D9D9',
      top: 0,
      justifyContent: "space-between"
      }}>
    {/* This displays the logo */}
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={require("../utils/ViDscribelogos.png")} alt="logo" width={150}/>
    </Link>

    <SearchBar />
    {isLoggedIn ? <Button sx={{
                      backgroundColor: "secondary.main",
                      color: "white",
                    }}
                    className="category-btn"
                    onClick={logout}>Sign Out</Button> :
                    <Link
                    to={'/SignIn'}>
                    <Button sx={{
                      backgroundColor: "secondary.main",
                      color: "white",
                    }}
                    className="category-btn">
                    Sign In</Button> </Link>}
  </Stack>
)}

export default Navbar
