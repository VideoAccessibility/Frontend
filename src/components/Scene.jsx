import {Grid } from "@mui/material";
import {SceneCards} from "./";
import sceneinfo from "../data/sceneinfo";


const Scene = () => {
  return (
    <Grid item xs={12} md={12}>
        {sceneinfo.map((item, idx) => (
            <SceneCards
            key = {idx}
            sceneNum = {idx+1}
            timeFrame = {item.timeFrame}
            screenText = {item.onScreen}
            description = {item.description}

            />
        ))}
    </Grid>
  )
}

export default Scene;