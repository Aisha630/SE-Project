import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  InputAdornment,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import theme from "../themes/authThemes.js";

const categories = {
  Clothing: [
    "Eastern",
    "Trousers",
    "Jeans",
    "Dresses",
    "Jumpsuits",
    "Skirts",
    "Shorts",
    "T-shirts",
    "Formal",
  ],
  Technology: [
    "Phone",
    "Laptop",
    "Headphones",
    "Accessories",
    "Sony",
    "Apple",
    "HP",
    "Samsung",
    "Lenovo",
  ],
  Miscellaneous: ["Watch", "Jewelry", "Shoes", "Bags"],
};

const sizes = ["XS", "Small", "Medium", "Large", "XL"];
const colors = ["purple", "pink", "red", "orange", "blue", "black", "white"];

const PostAd = () => {
  const [adData, setAdData] = useState({
    category: "",
    subcategory: "",
    size: "",
    color: "",
    title: "",
    adDetails: "",
    brand: "",
    condition: "",
    quantity: 1,
    price: "",
    endDate: "",
    modeOfAd: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdData({ ...adData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submission logic
  };

  // get subcategories based on the selected category
  const subcategories = adData.category ? categories[adData.category] : [];

  return (
    <ThemeProvider theme={theme}>
      
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          py: 4,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: "100%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
            p: 3,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Post Your Ad
          </Typography>

          {/* Category Section */}
          <Typography variant="h6" sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}>
            Category
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
          </Box>

          {/* Subcategory Section */}
          {adData.category && (
            <>
              <Typography variant="h6" sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}>
                Subcategory
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
                <RadioGroup
                  row
                  name="subcategory"
                  value={adData.subcategory}
                  onChange={handleInputChange}
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  {subcategories.map((subcategory) => (
                    <FormControlLabel
                      key={subcategory}
                      value={subcategory}
                      control={<Radio />}
                      label={subcategory}
                    />
                  ))}
                </RadioGroup>
              </Box>
            </>
          )}

        <Typography variant="h6" sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}>
            Specifications
        </Typography>

          {/* Specifications Section inside the green box */}
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
            {/* Size and Color Options */}
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
                  sx={{ color: "black", textAlign: "left", fontWeight: "bold" }}
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
                          sx={{ color: "black", textTransform: "capitalize", justifyContent: "center" }}
                        >
                          {size}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </Box>
                <Box>
                    <Typography
                        variant="body1"
                        sx={{ color: "black", textAlign: "left", fontWeight: "bold"}}
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

          {/* Mode of Ad Section */}
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
            <FormControlLabel
              value="Auction"
              control={<Radio />}
              label="Auction"
            />
            <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
            <FormControlLabel
              value="Donation"
              control={<Radio />}
              label="Donation"
            />
          </RadioGroup>

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

          {/* Ad Details Section */}
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
            Ad Details
          </Typography>
          <TextField
            required
            fullWidth
            id="title"
            label="Ad Title"
            name="title"
            value={adData.title}
            onChange={handleInputChange}
            margin="normal"
            helperText="Please restrict your answer to this field to 50 characters."
            inputProps={{ maxLength: 50 }}
          />

          <TextField
            fullWidth
            id="adDetails"
            label="Ad Details"
            name="adDetails"
            multiline
            rows={4}
            value={adData.adDetails}
            onChange={handleInputChange}
            margin="normal"
            helperText="Include condition, features, space for negotiation, reasons for selling (0/1000)"
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

          {/* Condition Section */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Condition</FormLabel>
            <RadioGroup
              row
              name="condition"
              value={adData.condition}
              onChange={handleInputChange}
            >
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="used" control={<Radio />} label="Used" />
            </RadioGroup>
          </FormControl>

          {/* Price, Date, and Photo Upload Section */}

          <TextField
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            value={adData.price}
            onChange={handleInputChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rs.</InputAdornment>
              ),
            }}
          />

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, my: 2 }}
          >
            {[...Array(5)].map((_, index) => (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                key={index}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            ))}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 2,
              bgcolor: "primary.main",
              color: "white",
            }}
          >
            Post Now
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostAd;
