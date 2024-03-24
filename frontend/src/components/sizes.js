import React from 'react';
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import sizesData from '../config.json'; 

const SizesCategories = ({ state, handleChange }) => {
  const { sizes } = sizesData;

  const handleSizeChange = (size) => {
    // Handle size change
    // You can pass this function down to the Checkbox onClick event
    console.log('Size clicked:', size);
  };

  return (
    <FormControl sx={{ color: 'inherit' }}>
      <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{ color: 'inherit' }}>
        Sizes
      </Typography>
      <FormGroup sx={{ color: 'inherit', paddingTop: '10px' }}>
        {sizes.map((size) => (
          <FormControlLabel
            key={size}
            control={<Checkbox onClick={() => handleSizeChange(size)} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
            label={size.toUpperCase()}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default SizesCategories;
