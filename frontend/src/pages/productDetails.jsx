import React from 'react';
import { Grid, Box, Typography, Container, Paper } from '@mui/material';
import "react-image-gallery/styles/css/image-gallery.css";
import NavBar from '../components/navbarshop.jsx';
import SiteButton from '../components/button.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomImageGallery } from '../components/imageGallery.jsx';
import { ThemeProvider } from '@mui/system';
import theme from '../themes/homeTheme.js';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext.jsx';

const DetailItem = ({ label, value }) => (
  <Grid container columnSpacing={2} alignItems="center">
    <Grid item xs={6}>
      <Typography variant="subtitle1" gutterBottom textAlign="left" sx={{ color: "gray", mt: 1, mb: 1 }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle1" gutterBottom textAlign="right" sx={{ textTransform: "capitalize", mt: 2, mb: 2 }}>
        {value}
      </Typography>
    </Grid>
  </Grid>
);

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    fetch(`http://localhost:5003/shop/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => response.json()).then(data => {
      const formattedImages = data.images.map((imageUrl, index) => ({
        original: `http://localhost:5003${imageUrl}`,
        thumbnail: `http://localhost:5003${imageUrl}`,
      }));
      setProduct({ ...data, images: formattedImages })
    }).catch(error => { console.log(error) })
  }, [token, id]);

  const productDetails = product ? [
    { label: 'Condition', value: product.condition },
    { label: 'Brand', value: product.brand },
    { label: 'Seller', value: product.seller },
    { label: 'Size', value: product.size },
  ] : [];

  const { fetchCartItems } = useCart();

  const addToCart = (product) => {
    fetch(`http://localhost:5003/cart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: product._id }),
      credentials: 'include'
    }).then(response => {
      fetchCartItems();
      if (response.ok)
        toast.success(`${product.name} added to cart`);
      else if (response.status === 400)
        toast.error("Product already in cart");
      else if (response.status === 404) {
        toast.error("Product not found");
      }
    }).catch(error => {
      console.log(error)
      toast.error("Error adding to cart")
    }
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box >
        <NavBar />
        <Container maxWidth="80%" disableGutters sx={{ m: 0, p: 0 }}>
          <Box display="flex" flexDirection="row" alignItems="stretch">
            <Box width="60vw">
              <CustomImageGallery items={product ? product.images : []} sx={{ boxShadow: "none" }} />
            </Box>
            <Paper sx={{ padding: 7, flex: 1, borderRadius: 0 }}>
              <Typography variant="h5" color="black" textAlign="left" sx={{ fontWeight: 500, mb: 0 }}>
                {product?.name}
              </Typography>
              <Typography variant="h6" color="black" textAlign="left" sx={{ fontWeight: 500, mb: 4 }}>
                {product && `PKR ${product.price}`}
              </Typography>
              {productDetails.map((detail, index) => (
                <DetailItem key={index} label={detail.label} value={detail.value} />
              ))}
              <SiteButton text="Add to Cart" onClick={() => addToCart(product)} styles={{ width: '100%', mt: 3, mb: 3, fontSize: "1rem", padding: 1.5 }} />
              <Typography variant="h6" textAlign="left" sx={{ mt: 3, color: "gray" }}>
                Description
              </Typography>
              <Typography variant="subtitle1" textAlign="left" sx={{ mt: 2 }}>
                {product?.description}
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};


export default ProductDetails;
