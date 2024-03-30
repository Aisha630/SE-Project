import React from 'react';
import { Card, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme.js';

function ImageCard({ imageUrl, style }) {

  return (
    <Card sx={{ ...style, borderRadius: '16px', overflow: 'hidden', boxShadow: 3, }}>
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

function OverlayImageCards({ bottomCardProps, topCardProps, link }) {
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  return (
    <Box sx={{ position: 'relative', width: 380, height: 490, margin: 0, p:0 }}>
      <ImageCard {...bottomCardProps} style={{
        mt: 5, width: 'calc(100% - 100px)',
        height: 'calc(100% - 100px)', opacity: 0.7, ml:0, p:0, mr:0
      }} />
      <Link to={link}>
        <ImageCard
          {...topCardProps}
          style={{
            position: 'absolute',
            top: -20,
            left: 20,
            width: 'calc(100% - 100px)',
            height: 'calc(100% - 100px)',
            '&:hover': { filter: 'brightness(0.9)' },
            p:0, m:0


          }}
        />
      </Link>
    </Box>
  );
}

export default OverlayImageCards;
