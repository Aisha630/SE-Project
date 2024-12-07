import React from 'react';
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import categoriesData from '../config.json'; 

const ColorFilter = ({checkedColors, handleChange }) => {
  const { colors } = categoriesData;

  return (
    <FormControl sx={{ color: 'inherit', paddingLeft:'40%' }}>
      <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{ color: 'inherit' }}>
        Colors
      </Typography>
      <FormGroup sx={{ color: 'inherit', paddingTop: '10px' }}>
        {colors.map((color) => (
          <FormControlLabel
            key={color}
            control = {<Checkbox checked={checkedColors.includes(color)} onChange={() => handleChange(color)} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
            label={color}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default ColorFilter;

