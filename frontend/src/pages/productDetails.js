import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import NavBar from '../components/navbarshop.js';

const images = [
  {
    original: 'https://via.placeholder.com/300',
    thumbnail: 'https://via.placeholder.com/300',
  },
  {
    original: 'https://via.placeholder.com/300',
    thumbnail: 'https://via.placeholder.com/300',
  },
];

const ProductDetails = () => {
  return (
    <Box>
      <NavBar />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <ImageGallery items={images} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h5" component="h1">
            Halter top with slit detail
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            PKR 1,200
          </Typography>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
