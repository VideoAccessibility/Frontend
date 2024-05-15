import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ image, name, info, email }) {

//   const handleEmailClick = () => {
//     window.location.href = `mailto:${email}`;
//   };

  return (
    <Card sx={{ maxWidth: 280, minWidth: 280 }}>
      <CardMedia
        sx={{ height: 200, objectFit:"contain" }}
        image={image}
        title="Image of one of the collaborators for the project"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" onClick={handleEmailClick}>Email</Button>
      </CardActions> */}
    </Card>
  );
}
