import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function MediaCard({ image, name, info, site, zoom }) {

  const handleNameClick = () => {
    if (site) {
      window.open(site, '_blank');
    }
  };

  return (
    <Card sx={{ maxWidth: 250, minWidth: 250 }}>
      <div
        style={{
          height: 200,
          backgroundImage: `url(${image})`,
          backgroundSize: zoom ? '180%' : 'contain',  // Apply zoom only if the zoom flag is true
          backgroundPosition: zoom ? '50% 0%' : 'center',
          backgroundRepeat: 'no-repeat',
        }}
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
