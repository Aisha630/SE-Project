import React from 'react';
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import sizesData from '../config.json'; 

const SizesCategories = ({ checkedSizes, handleSizeChange }) => {
  const { sizes } = sizesData;
  const clothingSizes = sizes['Clothing'];

  return (
    <FormControl sx={{ color: 'inherit' }}>
      <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{ color: 'inherit' }}>
        Sizes
      </Typography>
      <FormGroup sx={{ color: 'inherit', paddingTop: '10px' }}>
        {sizes.map((size) => (
          <FormControlLabel
            key={size}
            // control={<Checkbox onClick={() => setCheckedSizes(size)} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
            control = {<Checkbox checked={checkedSizes.includes(size)} onChange={() => handleSizeChange(size)} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}

            label={size.toUpperCase()}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default SizesCategories;
