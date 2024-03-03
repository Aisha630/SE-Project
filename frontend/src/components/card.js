import React from 'react';
import { Card, CardMedia, Box } from '@mui/material';

function ImageCard({ imageUrl, style }) {
  return (
    <Card sx={{ ...style, borderRadius: '16px', overflow: 'hidden', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="auto"
        image={imageUrl}
        alt="New item"
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </Card>
  );
}

function OverlayImageCards({ bottomCardProps, topCardProps }) {

  return (
    <Box sx={{ position: 'relative', width: 420, height: 520, margin: 'auto' }}>
      <ImageCard {...bottomCardProps} style={{
        mt: 5, width: 'calc(100% - 100px)',
        height: 'calc(100% - 100px)', opacity: 0.7
      }} />
      <ImageCard
        {...topCardProps}
        style={{
          position: 'absolute',
          top: -20,
          left: 20,
          width: 'calc(100% - 100px)',
          height: 'calc(100% - 100px)',
        }}
      />
    </Box>
  );
}

export default OverlayImageCards;
