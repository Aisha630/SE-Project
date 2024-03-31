import React from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  TextField
} from "@mui/material";

const ModeOfAdSelection = ({ adData, handleInputChange }) => (
  <Box>
    <Typography variant="h6" sx={{ mb: 2, alignSelf: "flex-start" }}>
      Mode of Ad
    </Typography>
    <RadioGroup
      row
      name="productType"
      value={adData.productType}
      onChange={handleInputChange}
      sx={{
        justifyContent: "center",
        mb: 3,
      }}
    >
      <FormControlLabel value="auction" control={<Radio />} label="Auction" />
      {adData.productType === "auction" && (
        <TextField
          fullWidth
          id="endDate"
          label="End Bidding On:"
          type="date"
          name="endDate"
          value={adData.endDate}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      <FormControlLabel value="sale" control={<Radio />} label="Sale" />
      <FormControlLabel value="donation" control={<Radio />} label="Donation" />
    </RadioGroup>
  </Box>
);

export default ModeOfAdSelection;
