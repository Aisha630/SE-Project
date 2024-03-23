import React from 'react';
import { Grid, Box, Typography, Button, Container, Paper } from '@mui/material';
// import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import NavBar from '../components/navbarshop.js';
import "../css/App.css";
import SiteButton from '../components/button.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomImageGallery } from '../components/imageGallery.js';

// const images = [
//   {
//     original: '/img1.png',
//     thumbnail: '/img2.png',
//   },
//   {
//     original: '/img1.png',
//     thumbnail: '/img3.png',
//   },
// ];


const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token)


  useEffect(() => {
    fetch(`http://localhost:5003/shop/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }

    }).then(response => response.json()).then(data => {
      const firstImageThumbnail = data.images[0];
      const formattedImages = data.images.map((imageUrl, index) => ({
        original: `http://localhost:5003${imageUrl}`,

        thumbnail: `http://localhost:5003${firstImageThumbnail}`,
      }));
      setProduct({ ...data, images: formattedImages })
    }).catch(error => { console.log(error) })
  }, []);

  console.log("Product is ", product)


  return (
    <Box>
      <NavBar />
      <Container sx={{ margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px" }}>
        <Grid container spacing={4} sx={{ margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px" }}>
          <Grid item xs={12} md={7} >
            <CustomImageGallery items={product ? product.images : []} sx={{ boxShadow: "none" }} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ padding: 2, margin:0}}>
              <Box>
                <Typography variant="h5" component="h1" align="center" color="black" >
                  {product ? product.name : ""}
                </Typography>
              </Box>
              <Typography variant="subtitle1" color="black" align="center">
                {product ? "PKR " + product.price : ""}
              </Typography>
              <Typography variant="subtitle1" color="black" align="center">
                {product ? "PKR " + product.price : ""}
              </Typography>
              <Typography variant="subtitle1" color="black" align="center">
                {product ? "PKR " + product.price : ""}
              </Typography>
              <SiteButton text="Add to Cart" />
            </Paper>
          </Grid>
        </Grid>

      </Container>

    </Box>
  );
};

export default ProductDetails;
