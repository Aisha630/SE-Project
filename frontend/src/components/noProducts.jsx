import { Box } from '@mui/material';
import React from 'react'

const NoProducts = ({styles}) => {
  return (
    <Box sx={{
      ...styles
    }}>
      Sorry, no products found.
    </Box>
  )
}

export default NoProducts;
