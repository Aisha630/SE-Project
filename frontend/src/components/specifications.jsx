import React from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

// this component is used to select the size and color of the item being posted as an ad
// the sizes and colors are passed as props to this component
const Specifications = ({ adData, handleInputChange, sizes, colors }) => (
  <>
    <Typography
      variant="h6"
      sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}
    >
      Specifications
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
      <Box
        sx={{
          pl: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {/* Size Options */}
        <Box>
          <Typography
            variant="body1"
            sx={{
              color: "black",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            Size
          </Typography>
          <RadioGroup
            row
            name="size"
            value={adData.size}
            onChange={handleInputChange}
            sx={{
              justifyContent: "center",
            }}
          >
            {sizes.map((size) => (
              <FormControlLabel
                key={size}
                value={size}
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{
                      color: "black",
                      textTransform: "uppercase",
                      justifyContent: "center",
                    }}
                  >
                    {size}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Box>
        {/* Color Options */}
        <Box>
          <Typography
            variant="body1"
            sx={{
              color: "black",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            Color
          </Typography>
          <RadioGroup
            row
            name="color"
            value={adData.color}
            onChange={handleInputChange}
            sx={{
              justifyContent: "center",
            }}
          >
            {colors.map((color) => (
              <FormControlLabel
                key={color}
                value={color}
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{
                      color: "black",
                      textTransform: "capitalize",
                      justifyContent: "center",
                    }}
                  >
                    {color}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Box>
      </Box>
    </Box>
  </>
);

export default Specifications;
