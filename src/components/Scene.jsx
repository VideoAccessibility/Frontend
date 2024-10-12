// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Chip,
//   CardContent,
//   Typography,
//   Button,
//   TextField,
//   DialogActions,
//   InputLabel,
//   FormControl,
//   MenuItem,
//   Select,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";
// import formatTime from "../utils/functions";

// const Scene = ({id}) => {
//   const [descriptions, setDescriptions] = useState([]);
//   const [editedDescription, setEditedDescription] = useState("");
//   const [selectedDescriptionId, setSelectedDescriptionId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   const url = "https://vidscribe.org/b/descriptions/";
//   const token = Cookies.get("jwtToken");
//   const parameters = { video_id: id, jwt: token };

//   useEffect(() => {
//     axios
//       .get(url, { params: parameters })
//       .then((response) => {
//         // Parse JSON strings into JavaScript objects
//         const descriptions = response.data.descriptions.map((item) =>
//           JSON.parse(item)
//         );

//         // Extract unique user names from all descriptions and set them in state
//         const uniqueUserNames = Array.from(
//           new Set(
//             descriptions.map((description) => {
//               // Log each user name before adding it to the set
//               console.log(description.username);
//               return description.username;
//             })
//           )
//         );

//         setDescriptions(descriptions);
//         setLoading(false);
//         // Assuming the first user in the uniqueUserNames array as the initial user
//         setCurrentUser(uniqueUserNames[0]);
//       })
//       .catch((err) => {
//         console.log("Error fetching description data", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleUserChange = (event) => {
//     const selectedUser = event.target.value;
//     setCurrentUser(selectedUser);
//   };

//   const handleEditClick = (descriptionId, descriptionText) => {
//     setSelectedDescriptionId(descriptionId);
//     setEditedDescription(descriptionText);
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     if (selectedDescriptionId !== null) {
//       const updatedDescription = {
//         id: selectedDescriptionId,
//         modified_descriptions: editedDescription,
//         jwt: token
//       };
//       console.log("here is the updated info", selectedDescriptionId, editedDescription)
  
//       axios
//         .put(`https://vidscribe.org/b/descriptions/`, updatedDescription)
//         .then((response) => {
//           console.log('Description updated successfully:', response.data.message);
  
//           // Trigger a re-render by fetching updated data from the API
//           axios
//             .get(url, { params: parameters })
//             .then((response) => {
//               const descriptions = response.data.descriptions.map((item) =>
//                 JSON.parse(item)
//               );
//               setDescriptions(descriptions);
//               setIsEditing(false);
//               setSelectedDescriptionId(null);
//             })
//             .catch((err) => {
//               console.log('Error fetching updated description data', err);
//             });
//         })
//         .catch((error) => {
//           console.error('Error updating description:', error);
//         });
//     }
//   };
  

//   return (
//     <div>
//       {isLoading ? (
//         <div className="App">Loading...</div>
//       ) : (
//         <div>
//           {/* User selection dropdown */}
//           {currentUser && (
//             <FormControl
//               sx={{
//                 margin: "20px 0",
//                 width: "300px",
//                 backgroundColor: "primary.light",
//               }}
//             >
//               <InputLabel>User</InputLabel>
//               <Select value={currentUser} onChange={handleUserChange}>
//                 {Array.from(
//                   new Set(
//                     descriptions.map((description) => description.username)
//                   )
//                 ).map((username) => (
//                   <MenuItem key={username} value={username}>
//                     {username}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {/* Description cards */}
//           {descriptions
//             .filter((description) => description.username === currentUser)
//             .sort((a, b) => parseInt(a.time_stamp) - parseInt(b.time_stamp)) // Sort based on timestamps
//             .map((description) => (
//               <Card
//                 key={description.id}
//                 variant="outlined"
//                 sx={{ marginBottom: "10px", backgroundColor: "primary.light" }}
//               >
//                 <CardContent>
//                   <Chip
//                     label={formatTime(parseInt(description.time_stamp_start))+ " - " + formatTime(parseInt(description.time_stamp_end))}
//                     sx={{
//                       backgroundColor: "primary.main",
//                       color: "white",
//                       marginBottom: "20px",
//                     }}
//                   />
//                   {isEditing && selectedDescriptionId === description.id ? (
//                     <TextField
//                       multiline
//                       fullWidth
//                       sx={{
//                         backgroundColor: "white",
//                       }}
//                       variant="outlined"
//                       label="Edit Description"
//                       value={editedDescription}
//                       onChange={(e) => setEditedDescription(e.target.value)}
//                     />
//                   ) : (
//                     <Box
//                       p={1.5}
//                       borderRadius="5px"
//                       sx={{ backgroundColor: "white" }}
//                       boxShadow={3}
//                     >
//                       <Typography variant="body1">
//                         {description.descriptions}{" "}
//                         {/* Assuming description property name is descriptions */}
//                       </Typography>
//                     </Box>
//                   )}
//                   <div style={{ marginTop: "10px" }}>
//                     {isEditing && selectedDescriptionId === description.id ? (
//                       <DialogActions>
//                         <Button
//                           onClick={handleSaveClick}
//                           sx={{
//                             backgroundColor: "secondary.main",
//                             color: "white",
//                             marginTop: "10px",
//                           }}
//                           className="category-btn"
//                         >
//                           Save
//                         </Button>
//                       </DialogActions>
//                     ) : (
//                       <Button
//                         onClick={() =>
//                           handleEditClick(
//                             description.id,
//                             description.descriptions
//                           )
//                         }
//                         sx={{
//                           backgroundColor: "secondary.main",
//                           color: "white",
//                           marginTop: "10px",
//                         }}
//                         className="category-btn"
//                       >
//                         Edit
//                       </Button>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Scene;


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

const Scene = ({ id }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStartTime, setEditedStartTime] = useState("");
  const [editedEndTime, setEditedEndTime] = useState("");
  const [selectedDescriptionId, setSelectedDescriptionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const url = "https://vidscribe.org/b/descriptions/";
  const token = Cookies.get("jwtToken");
  const parameters = { video_id: id, jwt: token };

  useEffect(() => {
    axios
      .get(url, { params: parameters })
      .then((response) => {
        const descriptions = response.data.descriptions.map((item) =>
          JSON.parse(item)
        );
        const uniqueUserNames = Array.from(
          new Set(
            descriptions.map((description) => description.username)
          )
        );
        setDescriptions(descriptions);
        setLoading(false);
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

  const handleEditClick = (descriptionId, descriptionText, startTime, endTime) => {
    setSelectedDescriptionId(descriptionId);
    setEditedDescription(descriptionText);
    setEditedStartTime(startTime);
    setEditedEndTime(endTime);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (selectedDescriptionId !== null) {
      // Validate that the end timestamp is greater than the start timestamp
      if (parseInt(editedEndTime) <= parseInt(editedStartTime)) {
        setError("End timestamp cannot be smaller than or equal to start timestamp.");
        return;
      }

      const updatedDescription = {
        id: selectedDescriptionId,
        modified_descriptions: editedDescription,
        time_stamp_start: parseInt(editedStartTime),
        time_stamp_end: parseInt(editedEndTime),
        jwt: token,
      };

      console.log("Updated descriptions:", updatedDescription )
      axios
        .put(`https://vidscribe.org/b/descriptions/`, updatedDescription)
        .then((response) => {
          console.log("Description updated successfully:", response.data.message);
          axios
            .get(url, { params: parameters })
            .then((response) => {
              const descriptions = response.data.descriptions.map((item) =>
                JSON.parse(item)
              );
              setDescriptions(descriptions);
              setIsEditing(false);
              setSelectedDescriptionId(null);
              setError(""); // Clear any error messages
            })
            .catch((err) => {
              console.log("Error fetching updated description data", err);
            });
        })
        .catch((error) => {
          console.error("Error updating description:", error);
        });
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="App">Loading...</div>
      ) : (
        <div>
          {currentUser && (
            <FormControl
              sx={{
                margin: "20px 0",
                width: "300px",
                backgroundColor: "primary.light",
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

          {descriptions
            .filter((description) => description.username === currentUser)
            .sort((a, b) => parseInt(a.time_stamp) - parseInt(b.time_stamp))
            .map((description) => (
              <Card
                key={description.id}
                variant="outlined"
                sx={{ marginBottom: "10px", backgroundColor: "primary.light" }}
              >
                <CardContent>
                  <Chip
                    label={
                      formatTime(parseInt(description.time_stamp_start)) +
                      " - " +
                      formatTime(parseInt(description.time_stamp_end))
                    }
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      marginBottom: "20px",
                    }}
                  />
                  {isEditing && selectedDescriptionId === description.id ? (
                    <div>
                      <TextField
                        multiline
                        fullWidth
                        sx={{ backgroundColor: "white" }}
                        variant="outlined"
                        label="Edit Description"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      />
                      <TextField
                        label="Start Time"
                        type="number"
                        value={editedStartTime}
                        onChange={(e) => setEditedStartTime(e.target.value)}
                        sx={{ marginTop: "10px", marginRight: "10px" }}
                      />
                      <TextField
                        label="End Time"
                        type="number"
                        value={editedEndTime}
                        onChange={(e) => setEditedEndTime(e.target.value)}
                        sx={{ marginTop: "10px" }}
                      />
                      {error && (
                        <Typography color="error" variant="body2" sx={{ marginTop: "10px" }}>
                          {error}
                        </Typography>
                      )}
                    </div>
                  ) : (
                    <Box
                      p={1.5}
                      borderRadius="5px"
                      sx={{ backgroundColor: "white" }}
                      boxShadow={3}
                    >
                      <Typography variant="body1">
                        {description.descriptions}
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
                        >
                          Save
                        </Button>
                      </DialogActions>
                    ) : (
                      <Button
                        onClick={() =>
                          handleEditClick(
                            description.id,
                            description.descriptions,
                            description.time_stamp_start,
                            description.time_stamp_end
                          )
                        }
                        sx={{
                          backgroundColor: "secondary.main",
                          color: "white",
                          marginTop: "10px",
                        }}
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
