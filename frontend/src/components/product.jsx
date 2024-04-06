import React from 'react'
import { Grid, Typography } from '@mui/material';

const Product = ({ product, mode }) => {

  //logic for auction
  const currentDate = new Date();
  const endDate = new Date(product.endTime);
  const timeDifference = endDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return (

    <Grid item xs={10} sm={12} md={6} lg={4} style={{ padding: '5px' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      <Typography variant="h6" align="left">{product.name}</Typography>
      {mode === 'sale' &&
        <Typography variant="subtitle1" align="left">PKR {product.price}</Typography>
      }
      {mode === 'auction' &&
        <>
          <Typography variant="subtitle1" align="left">Current Bid: PKR {product.currentBid}</Typography>
          <div>
            { }
          </div>
          <Typography variant="subtitle1" align="left">Time Left: {daysDifference} days</Typography>
        </>
      }
    </Grid>

  );
};

export default Product
