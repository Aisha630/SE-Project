import React from 'react';
import { Box, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

// this component is used to select the category of the ad
// it displays a list of categories and allows the user to select one
const CategorySelection = ({ categories, adData, handleInputChange, errors }) => (
  <>
    <Typography
      variant="h6"
      sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}
    >
      Category
    </Typography>
    <Box
      sx={{
        bgcolor: "secondary.main",
        p: 2,
        borderRadius: 2,
        mb: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RadioGroup
        row
        name="category"
        value={adData.category}
        onChange={handleInputChange}
        sx={{
          justifyContent: "center",
        }}
      >
        {Object.keys(categories).map((category) => (
          <FormControlLabel
            key={category}
            value={category}
            control={<Radio />}
            label={category}
          />
        ))}
      </RadioGroup>
      {errors.category && (
        <Typography color="error" variant="caption">
          {errors.category}
        </Typography>
      )}
    </Box>
  </>
);

export default CategorySelection;
