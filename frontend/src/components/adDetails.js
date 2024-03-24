import React from 'react';
import { Typography, TextField } from '@mui/material';

const AdDetails = ({ adData, handleInputChange, errors }) => (
  <>
    <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
      Ad Details
    </Typography>
    <TextField
      required
      fullWidth
      error={Boolean(errors.name)}
      id="name"
      label="Ad Title"
      name="name"
      value={adData.name}
      onChange={handleInputChange}
      margin="normal"
      helperText={
        errors.name ||
        "Please restrict your answer to this field to 100 characters."
      }
      inputProps={{ maxLength: 100 }}
    />

    <TextField
      fullWidth
      id="description"
      label="Ad Details"
      name="description"
      multiline
      rows={4}
      value={adData.description}
      onChange={handleInputChange}
      margin="normal"
      helperText="Please include condition, features, space for negotiation, reasons for selling (max 1000 characters)."
      inputProps={{ maxLength: 1000 }}
    />

    <TextField
      fullWidth
      id="brand"
      label="Brand"
      name="brand"
      value={adData.brand}
      onChange={handleInputChange}
      margin="normal"
    />
  </>
);

export default AdDetails;
