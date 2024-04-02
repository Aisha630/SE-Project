import React from 'react'
import { Grid, Typography } from '@mui/material';

const Product = ({ product, mode }) => {
  // random number between 1 and 10
  const randomTime = Math.floor(Math.random() * 10) + 1;
  
  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      <Typography variant="h6" align="left">{product.name}</Typography>
      {mode === 'sale' &&
        <Typography variant="subtitle1" align="left">PKR {product.price}</Typography>
      }
      {mode === 'auction' &&
        <>
          <Typography variant="subtitle1" align="left">Highest Bid: PKR {product.startingBid}</Typography>
          <Typography variant="subtitle1" align="left">Time Left: {randomTime} days</Typography>
        </>
      }
      {
        mode === 'donate' &&
        <Typography variant="subtitle1" align="left">Doner Review?</Typography>
      }
    </Grid>

  );
};

export default Product
