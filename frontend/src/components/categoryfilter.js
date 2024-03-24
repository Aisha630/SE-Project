// import React from 'react';
// import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
// import categoriesData from '../config.json'; 

// const CategoryFilter = ({ state, handleChange }) => {
//   const { categories } = categoriesData;
//   const clothingSubcategories = categories['Clothing'];

//   const handleSubcategoryChange = (subcategory) => {
//     // Handle subcategory change
//     // You can pass this function down to the Checkbox onClick event
//     console.log('Subcategory clicked:', subcategory);
//   };

//   return (
//     <FormControl sx={{ color: 'inherit' }}>
//       <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{ color: 'inherit' }}>
//         Categories
//       </Typography>
//       <FormGroup sx={{ color: 'inherit', paddingTop: '10px' }}>
//         {clothingSubcategories.map((subcategory) => (
//           <FormControlLabel
//             key={subcategory}
//             control={<Checkbox onClick={() => handleSubcategoryChange(subcategory)} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
//             label={subcategory}
//           />
//         ))}
//       </FormGroup>
//     </FormControl>
//   );
// };

// export default CategoryFilter;
import React, { useState } from 'react';
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import categoriesData from '../config.json'; 

const CategoryFilter = ({ state, handleChange }) => {
  const { categories } = categoriesData;
  const clothingSubcategories = categories['Clothing'];

  // Initialize state to keep track of checked subcategories
  const [checkedSubcategories, setCheckedSubcategories] = useState([]);

  // Handler for subcategory checkbox change
  const handleSubcategoryChange = (subcategory) => {
    const isChecked = checkedSubcategories.includes(subcategory);
    if (isChecked) {
      // Remove subcategory from checked list
      setCheckedSubcategories(checkedSubcategories.filter((item) => item !== subcategory));
    } else {
      // Add subcategory to checked list
      setCheckedSubcategories([...checkedSubcategories, subcategory]);
    }
    // You can also pass this information to the parent component if needed
    console.log('Checked subcategories:', checkedSubcategories);
  };

  return (
    <FormControl sx={{ color: 'inherit' }}>
      <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{ color: 'inherit' }}>
        Categories
      </Typography>
      <FormGroup sx={{ color: 'inherit', paddingTop: '10px' }}>
        {clothingSubcategories.map((subcategory) => (
          <FormControlLabel
            key={subcategory}
            control={<Checkbox checked={checkedSubcategories.includes(subcategory)} onChange={() => handleSubcategoryChange(subcategory)} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
            label={subcategory}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CategoryFilter;
