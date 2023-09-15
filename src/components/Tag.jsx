// This component just renders different tags given what you want in the tag and the color of the tag
import {Typography} from '@mui/material';


const Tag = (props) => {
  return (
        <Typography fontSize="0.5rem" color="white" backgroundColor={props.colour} padding="3px 10px" borderRadius="5px" marginRight={"10px"}>
                {props.text}
        </Typography>
  )
}

export default Tag