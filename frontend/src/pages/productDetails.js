import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import NavBar from '../components/navbarshop.js';
import "../css/App.css";
import SiteButton from '../components/button.js';

const images = [
  {
    original: '/img1.png',
    thumbnail: '/img2.png',
  },
  {
    original: '/img1.png',
    thumbnail: '/img3.png',
  },
];

const ProductDetails = () => {
  return (
    <Box>
      <NavBar />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <ImageGallery items={images} sx={{ boxShadow: "none" }} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h5" component="h1" align="center" color="black" >
            Halter top with slit detail
          </Typography>
          <Typography variant="subtitle1" color="black" align="center">
            PKR 1,200
          </Typography>
          <SiteButton text="Add to Cart" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
