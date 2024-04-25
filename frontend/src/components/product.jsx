import React from 'react'
import { Grid, Typography } from '@mui/material';

const Product = ({ product, mode }) => {

  //logic for auction
  const currentDate = new Date();
  const endDate = new Date(product.endTime);
  const timeDifference = endDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) > 0 ? Math.ceil(timeDifference / (1000 * 3600 * 24)).toString() + " days" : "Less than 1 day";
  console.log("Product is ", product)
  console.log("Mode is ", mode)
  return (
    // <Grid item xs={10} sm={12} md={6} lg={4} style={{ padding: '5px' }}>
      <Grid item xs={12} sm={6} md={6} lg={3} style={{ paddingBottom:80, paddingLeft:5, paddingRight:5, }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height:'83%' }} />
      <Typography variant="h6" align="left">{product.name}</Typography>
      {mode === 'sale' &&
        <Typography variant="subtitle1" align="left">PKR {product.price}</Typography>
      }
      {mode === 'auction' &&
        <>
          <Typography variant="subtitle1" align="left">Current Bid: PKR {product.currentBid}</Typography>
          <Typography variant="subtitle1" align="left">Time Left: {daysDifference} </Typography>
        </>
      }
    </Grid>

  );
};

export default Product
