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
      name="modeOfAd"
      value={adData.modeOfAd}
      onChange={handleInputChange}
      sx={{
        justifyContent: "center",
        mb: 3,
      }}
    >
      <FormControlLabel value="Auction" control={<Radio />} label="Auction" />
      {adData.modeOfAd === "Auction" && (
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
      <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
      <FormControlLabel value="Donation" control={<Radio />} label="Donation" />
    </RadioGroup>
  </Box>
);

export default ModeOfAdSelection;
