import React from 'react';
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import categoriesData from '../config.json'; 

const CategoryFilter = ({category, checkedSubcategories, handleChange }) => {
  const { categories } = categoriesData;
  const clothingSubcategories = categories[category];

  return (
    <FormControl sx={{ color: 'inherit', paddingLeft:10 }}>
      <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{ color: 'inherit' }}>
        Categories
      </Typography>
      <FormGroup sx={{ color: 'inherit', paddingTop: '10px' }}>
        {clothingSubcategories.map((subcategory) => (
          <FormControlLabel
            key={subcategory}
            control = {<Checkbox checked={checkedSubcategories.includes(subcategory)} onChange={() => handleChange(subcategory)} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
            label={subcategory}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CategoryFilter;

