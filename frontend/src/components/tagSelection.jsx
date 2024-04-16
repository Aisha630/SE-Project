import React from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";

// this component is used to select the subcategories of the ad
const TagSelection = ({ subcategories, adData, handleTagChange, theme }) => (
  <>
    <Typography
      variant="h6"
      sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}
    >
      Subcategories
    </Typography>
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
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
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {subcategories.map((tag) => (
          <FormControlLabel
            key={tag}
            control={
              <Checkbox
                checked={adData.tags.includes(tag)}
                onChange={handleTagChange}
                value={tag}
                name="tags"
              />
            }
            label={tag}
          />
        ))}
      </Box>
    </Box>
  </>
);

export default TagSelection;
