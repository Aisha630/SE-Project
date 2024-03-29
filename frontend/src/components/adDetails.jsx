import React from "react";
import { Typography, TextField } from "@mui/material";

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
      required
      fullWidth
      id="description"
      label="Description"
      name="description"
      multiline
      rows={4}
      value={adData.description}
      onChange={handleInputChange}
      margin="normal"
      helperText="Please include condition, features, space for negotiation, reasons for selling (max: 300 characters)."
      inputProps={{ maxLength: 300 }}
    />

    <TextField
      required
      fullWidth
      error={Boolean(errors.name)}
      id="brand"
      label="Brand"
      name="brand"
      value={adData.brand}
      onChange={handleInputChange}
      helperText={
        errors.brand ||
        "Please enter the brand of the product (max: 100 characters)."
      }
      margin="normal"
      inputProps={{ maxLength: 100 }}
    />
  </>
);

export default AdDetails;
