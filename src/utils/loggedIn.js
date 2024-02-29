import {jwtDecode} from 'jwt-decode';

function tokenUsable(token){
  // User is not logged in, display Material-UI Alert
  const decodedToken = jwtDecode(token);
  const currentTime = new Date(); // Convert milliseconds to seconds

  // Check if the token is not expired
  return true//decodedToken.exp * 1000 > currentTime.getTime();

}

export default tokenUsable;