import React from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
} from "@mui/material";

// this component is used to select the mode of the ad (auction, sale, or donation)
// based on the selected mode, it conditionally renders additional fields
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
      <FormControlLabel value="sale" control={<Radio />} label="Sale" />
      <FormControlLabel value="donate" control={<Radio />} label="Donation" />
    </RadioGroup>
    {adData.productType === "auction" && (
      <>
        <TextField
          fullWidth
          id="startingBid"
          label="Starting Bid:"
          type="number"
          name="startingBid"
          value={adData.startingBid}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="endTime"
          label="End Time:"
          type="datetime-local"
          name="endTime"
          value={adData.endTime}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            max: "9999-12-31T23:59",
          }}
        />
      </>
    )}
  </Box>
);

export default ModeOfAdSelection;
