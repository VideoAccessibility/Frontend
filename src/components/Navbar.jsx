import { Stack, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import {jwtDecode} from "jwt-decode";
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  const token = Cookies.get("jwtToken");
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
    Cookies.remove("jwtToken");
    window.location.reload();
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        p={2}
        sx={{
          // position: "sticky",
          top: 0,
          justifyContent: "space-between",
        }}
      >
        <SearchBar />
        <Stack direction="row" spacing={2}>
          {isLoggedIn ? (
            <Button
              variant="contained"
              className="category-btn"
              sx={{
                p: "5px 15px",
                borderRadius: "30px",
                fontSize: "large",
              }}
              aria-label="Log out from your account, you are currently signed in"
              onClick={logout}
            >
              Sign Out
            </Button>
          ) : (
            <Link to={"/SignIn"}>
              <Button
                variant="contained"
                sx={{
                  p: "5px 15px",
                  borderRadius: "30px",
                  fontSize: "large",
                }}
                aria-label="Log in to your account, you are currently not signed in"
                className="category-btn"
              >
                Sign In
              </Button>
            </Link>
          )}
          {/* <IconButton
            aria-label="Go to settings for audio descriptions for videos"
            component={Link}
            to={"/settings"}
          >
            <SettingsIcon  sx={{ fontSize: 30 }} />
          </IconButton> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Navbar;
