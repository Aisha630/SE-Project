import React from 'react'
import {Grid, Typography} from '@mui/material';

const Product = ({name, image, price}) => {
  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
        <img src={image} alt={name} style={{width: '100%'}} />
        <Typography variant="h6" align="left">{name}</Typography>
        <Typography variant="subtitle1" align="left">PKR {price}</Typography>
    </Grid>
  );
};

export default Product
