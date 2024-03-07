import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Typography, Paper } from "@mui/material";

const SceneCards = (props) => {
  function handleDelete(event){
    console.log(event)
  }

  return (
    <Paper elevation={2}>
    <Box  p={2} sx= {{ backgroundColor : "#1D5B79" , borderRadius : "5px", marginBottom : "32px"}} >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Displays Scene number */}
        <Grid item xs={2}>
          <Typography variant="h6" sx={{color : "white"}} >Scene {props.sceneNum}</Typography>
        </Grid>
        {/* Displays time stamp */}
        <Grid item xs={1} >
            <Typography fontSize="1rem" color="white" backgroundColor="#EF6262" padding="3px" borderRadius="5px">
                {props.timeFrame}
            </Typography>
        </Grid>
        <Grid item xs={9}>
        <Box display="flex" justifyContent="flex-end">
        <span onClick={handleDelete}>
        <DeleteIcon
          sx={{ 
          color: '#EF6262' }} 
          aria-label='delete scene'
          />
        </span>
        </Box>
        </Grid>
    
        <Grid item xs={3} md={2}>
          <Typography variant="subtitle1" sx={{color : "white"}}>On screen text</Typography>
        </Grid>
        <Grid item xs={9} md={10}>
        <Box p={1.5}  borderRadius="5px" sx={{backgroundColor : "white"}}>
          <Typography variant="body1" sx={{color : "#1D5B79"}} > 
            {props.screenText}
          </Typography>
        </Box>
        </Grid>

        <Grid item xs={3} md={2}>
          <Typography variant="subtitle1" sx={{color : "white"}} >Description</Typography>
        </Grid>
        <Grid item xs={9} md={10}>
        <Box p={1.5}  borderRadius="5px" sx={{backgroundColor : "white"}}>
          <Typography variant="body1" sx={{color : "#1D5B79"}} > 
            {props.description}
          </Typography>
        </Box>
        </Grid>

      </Grid>
    </Box>
    </Paper>
  )
}

export default SceneCards

