import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
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
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DetailItem = ({ label, value, lg }) => (

  <Grid container columnSpacing={2} alignItems="center">
    <Grid item xs={6}>
      <Typography variant={lg ? "subtitle1" : "subtitle2"} gutterBottom textAlign="left" sx={{ color: "gray", mt: 1, mb: 1, fontWeight: 400 }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant={lg ? "subtitle1" : "subtitle2"} gutterBottom textAlign="right" sx={{ textTransform: "capitalize", mt: 2, mb: 2, fontWeight: 400 }}>
        {value}
      </Typography>
    </Grid>
  </Grid>
);

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5003/shop/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      if (!response.ok)
        navigate("/login")
      return response.json()
    }).then(data => {
      const formattedImages = data.images.map((imageUrl, index) => ({
        original: `http://localhost:5003${imageUrl}`,
        thumbnail: `http://localhost:5003${imageUrl}`,
      }));
      setProduct({ ...data, images: formattedImages })
    }).catch(error => { console.log(error) })
  }, [token, id, navigate]);

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
  const lg = useMediaQuery(theme.breakpoints.up('sm'));


  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} sx={{ m: 0, p: 0, width: "100%" }}>
        <NavBar pageOn={""} />
        <Grid item xs={12} sm={12} md={12} lg={6} >
          <CustomImageGallery items={product ? product.images : []} sx={{ boxShadow: "none" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} sx={{ display: "flex", flexDirection: "row", alignItems: "stretch", m: 0, p: 0 }}>
          <Paper sx={{ padding: 7, flex: 1, borderRadius: 0 }}>
            <Typography variant="h5" color="black" textAlign="left" sx={{ fontWeight: 500, mb: 0 }}>
              {product?.name}
            </Typography>
            <Typography variant={lg ? "h6" : "subtitle1"} color="black" textAlign="left" sx={{ fontWeight: 500, mb: 4 }}>
              {product && `PKR ${product.price}`}
            </Typography>
            {productDetails.map((detail, index) => (
              <DetailItem key={index} label={detail.label} value={detail.value} lg={lg} />
            ))}
            <SiteButton text="Add to Cart" onClick={() => addToCart(product)} styles={{ width: '100%', mt: 3, mb: 3, fontSize: lg ? "1rem" : "0.8rem", padding: 1.5, }} />
            <Typography variant="h6" textAlign="left" sx={{ mt: 3, color: "gray" }}>
              Description
            </Typography>
            <Typography variant={lg ? "subtitle1" : "subtitle2"} textAlign="left" sx={{ mt: 2, fontWeight: 400 }}>
              {product?.description}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};


export default ProductDetails;
