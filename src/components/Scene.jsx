import React, { useState, useEffect } from "react";
import {
  Card,
  Chip,
  CardContent,
  Typography,
  Button,
  TextField,
  DialogActions,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import formatTime from "../utils/functions";

const Scene = ({id}) => {
  const [descriptions, setDescriptions] = useState([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [selectedDescriptionId, setSelectedDescriptionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const url = "https://vidscribe.org/descriptions/";
  const token = Cookies.get("jwtToken");
  const parameters = { video_id: id, jwt: token };

  useEffect(() => {
    axios
      .get(url, { params: parameters })
      .then((response) => {
        // Parse JSON strings into JavaScript objects
        const descriptions = response.data.descriptions.map((item) =>
          JSON.parse(item)
        );

        // Extract unique user names from all descriptions and set them in state
        const uniqueUserNames = Array.from(
          new Set(
            descriptions.map((description) => {
              // Log each user name before adding it to the set
              console.log(description.username);
              return description.username;
            })
          )
        );

        setDescriptions(descriptions);
        setLoading(false);
        // Assuming the first user in the uniqueUserNames array as the initial user
        setCurrentUser(uniqueUserNames[0]);
      })
      .catch((err) => {
        console.log("Error fetching description data", err);
        setLoading(false);
      });
  }, []);

  const handleUserChange = (event) => {
    const selectedUser = event.target.value;
    setCurrentUser(selectedUser);
  };

  const handleEditClick = (descriptionId, descriptionText) => {
    setSelectedDescriptionId(descriptionId);
    setEditedDescription(descriptionText);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (selectedDescriptionId !== null) {
      const updatedDescription = {
        id: selectedDescriptionId,
        modified_descriptions: editedDescription,
        jwt: token
      };
      console.log("here is the updated info", selectedDescriptionId, editedDescription)
  
      axios
        .put(`https://vidscribe.org/descriptions/`, updatedDescription)
        .then((response) => {
          console.log('Description updated successfully:', response.data.message);
  
          // Trigger a re-render by fetching updated data from the API
          axios
            .get(url, { params: parameters })
            .then((response) => {
              const descriptions = response.data.descriptions.map((item) =>
                JSON.parse(item)
              );
              setDescriptions(descriptions);
              setIsEditing(false);
              setSelectedDescriptionId(null);
            })
            .catch((err) => {
              console.log('Error fetching updated description data', err);
            });
        })
        .catch((error) => {
          console.error('Error updating description:', error);
        });
    }
  };
  

  return (
    <div>
      {isLoading ? (
        <div className="App">Loading...</div>
      ) : (
        <div>
          {/* User selection dropdown */}
          {currentUser && (
            <FormControl
              sx={{
                margin: "20px 0",
                width: "300px",
                backgroundColor: "primary.main",
              }}
            >
              <InputLabel>User</InputLabel>
              <Select value={currentUser} onChange={handleUserChange}>
                {Array.from(
                  new Set(
                    descriptions.map((description) => description.username)
                  )
                ).map((username) => (
                  <MenuItem key={username} value={username}>
                    {username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Description cards */}
          {descriptions
            .filter((description) => description.username === currentUser)
            .sort((a, b) => parseInt(a.time_stamp) - parseInt(b.time_stamp)) // Sort based on timestamps
            .map((description) => (
              <Card
                key={description.id}
                variant="outlined"
                sx={{ marginBottom: "10px", backgroundColor: "primary.main" }}
              >
                <CardContent>
                  <Chip
                    label={formatTime(parseInt(description.time_stamp_start))+ " - " + formatTime(parseInt(description.time_stamp_end))}
                    sx={{
                      backgroundColor: "secondary.light",
                      color: "white",
                      marginBottom: "20px",
                    }}
                  />
                  {isEditing && selectedDescriptionId === description.id ? (
                    <TextField
                      multiline
                      fullWidth
                      sx={{
                        backgroundColor: "white",
                      }}
                      variant="outlined"
                      label="Edit Description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    <Box
                      p={1.5}
                      borderRadius="5px"
                      sx={{ backgroundColor: "white" }}
                    >
                      <Typography variant="body1">
                        {description.descriptions}{" "}
                        {/* Assuming description property name is descriptions */}
                      </Typography>
                    </Box>
                  )}
                  <div style={{ marginTop: "10px" }}>
                    {isEditing && selectedDescriptionId === description.id ? (
                      <DialogActions>
                        <Button
                          onClick={handleSaveClick}
                          sx={{
                            backgroundColor: "secondary.main",
                            color: "white",
                            marginTop: "10px",
                          }}
                          className="category-btn"
                        >
                          Save
                        </Button>
                      </DialogActions>
                    ) : (
                      <Button
                        onClick={() =>
                          handleEditClick(
                            description.id,
                            description.descriptions
                          )
                        }
                        sx={{
                          backgroundColor: "secondary.main",
                          color: "white",
                          marginTop: "10px",
                        }}
                        className="category-btn"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Scene;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Chip,
//   CardContent,
//   Typography,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   InputLabel,
//   FormControl,
//   MenuItem,
//   Select,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";

// const fakeUsers = [
//   { id: 1, name: "User 1" },
//   { id: 2, name: "User 2" },
//   // Add more users as needed
// ];

// const Scene = () => {
//   const [currentUser, setCurrentUser] = useState(fakeUsers[0]);
//   const [fakeDescriptions, setFakeDescriptions] = useState([
//     {
//       id: 1,
//       timestamp: "00:05",
//       userId: 1,
//       description: "Description 1 by User 1",
//     },
//     {
//       id: 2,
//       timestamp: "00:10",
//       userId: 1,
//       description: "Description 1 by User 1 at 10 seconds",
//     },
//     {
//       id: 3,
//       timestamp: "00:15",
//       userId: 1,
//       description: "Description 1 by User 1 at 10 seconds",
//     },
//     {
//       id: 4,
//       timestamp: "01:30",
//       userId: 2,
//       description: "Description 2 by User 2",
//     },
//     // Add more fake descriptions as needed
//   ]);
//   const [editedDescription, setEditedDescription] = useState("");
//   const [selectedDescriptionId, setSelectedDescriptionId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setLoading] = useState(true);
//   const [desc, setDesc] = useState();

//   const url = "http://127.0.0.1:8000/descriptions/";
//   const token = Cookies.get("jwtToken");
//   const parameters = { video_id: 19, jwt: token };

//   useEffect(() => {

//     axios.get(url, { params: parameters })
//       .then((response) => {
//         console.log("Received description data in edit descriptions page", response.data.descriptions);
//         setDesc(
//           response.data.descriptions.map((item) => {
//             return JSON.parse(item);
//           })
//         );
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log("Not receiving data description data", err);
//         setLoading(false);
//       });

//   }, []);

//   if (isLoading) {
//     return <div className="App">Loading...</div>;
//   }

//   const handleUserChange = (event) => {
//     const userId = event.target.value;
//     const selectedUser = fakeUsers.find((user) => user.id === userId);
//     setCurrentUser(selectedUser);
//   };

//   const handleEditClick = (descriptionId, descriptionText) => {
//     setSelectedDescriptionId(descriptionId);
//     setEditedDescription(descriptionText);
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     if (selectedDescriptionId !== null) {
//       const updatedDescriptions = fakeDescriptions.map((description) =>
//         description.id === selectedDescriptionId
//           ? { ...description, description: editedDescription }
//           : description
//       );
//       setFakeDescriptions(updatedDescriptions);
//       setIsEditing(false);
//       setSelectedDescriptionId(null);
//     }
//   };

//   return (
//     <div>
//       <FormControl
//         sx={{
//           margin: "20px 0",
//           width: "300px",
//           backgroundColor: "primary.main",
//         }}
//       >
//         <InputLabel>User</InputLabel>
//         <Select value={currentUser.id} onChange={handleUserChange}>
//           {fakeUsers.map((user) => (
//             <MenuItem key={user.id} value={user.id}>
//               {user.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {fakeDescriptions
//         .filter((description) => description.userId === currentUser.id)
//         .map((description) => (
//           <Card
//             key={description.id}
//             variant="outlined"
//             sx={{ marginBottom: "10px", backgroundColor: "primary.main" }}
//           >
//             <CardContent>
//               <Chip
//                 label={description.timestamp}
//                 sx={{
//                   backgroundColor: "secondary.light",
//                   color: "white",
//                   marginBottom: "20px",
//                 }}
//               />
//               {isEditing && selectedDescriptionId === description.id ? (
//                 <TextField
//                   multiline
//                   fullWidth
//                   sx={{
//                     backgroundColor: "white",
//                   }}
//                   variant="outlined"
//                   label="Edit Description"
//                   value={editedDescription}
//                   onChange={(e) => setEditedDescription(e.target.value)}
//                 />
//               ) : (
//                 <Box p={1.5}  borderRadius="5px" sx={{backgroundColor : "white"}}>
//                 <Typography variant="body1">
//                   {description.description}
//                 </Typography>
//                 </Box>
//               )}
//               <div style={{ marginTop: "10px" }}>
//                 {isEditing && selectedDescriptionId === description.id ? (
//                   <DialogActions>
//                     <Button
//                       onClick={handleSaveClick}
//                       sx={{
//                         backgroundColor: "secondary.main",
//                         color: "white",
//                         marginTop: "10px",
//                       }}
//                       className="category-btn"
//                     >
//                       Save
//                     </Button>
//                   </DialogActions>
//                 ) : (
//                   <Button
//                     onClick={() =>
//                       handleEditClick(description.id, description.description)
//                     }
//                     sx={{
//                       backgroundColor: "secondary.main",
//                       color: "white",
//                       marginTop: "10px",
//                     }}
//                     className="category-btn"
//                   >
//                     Edit
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//     </div>
//   );
// };

// export default Scene;
