import React from 'react';
import { Card, CardMedia, Box, Typography } from '@mui/material';

function ImageCardWithOverlay({ imageUrl, title }) {
  return (
    <Card sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{ height: 'auto', width: '100%' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white', 
          padding: 2,
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        {/* Add more content here if desired */}
      </Box>
    </Card>
  );
}

export default ImageCardWithOverlay;
