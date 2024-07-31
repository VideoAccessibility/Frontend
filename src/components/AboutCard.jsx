import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({ image, name, info, site }) {

  const handleNameClick = () => {
    if (site) {
      window.open(site, '_blank');
    }
  };

  return (
    <Card sx={{ maxWidth: 250, minWidth: 250 }}>
      <CardMedia
        sx={{ height: 200, backgroundSize:"contain"}}
        image={image}
        title="Image of one of the collaborators for the project"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          onClick={handleNameClick}
          sx={{
            cursor: site ? 'pointer' : 'default',
            '&:hover': {
              color: site ? 'primary.main' : 'inherit',
            },
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
      </CardContent>
    </Card>
  );
}
