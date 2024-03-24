import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

const PriceSelection = ({ adData, handleInputChange, errors }) => (
  <TextField
    type="number"
    required
    fullWidth
    error={Boolean(errors.price)}
    id="price"
    label="Price"
    name="price"
    value={adData.price}
    onChange={handleInputChange}
    margin="normal"
    helperText={errors.price || ""}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Rs.</InputAdornment>
      ),
    }}
  />
);

export default PriceSelection;
