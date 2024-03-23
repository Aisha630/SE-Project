import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  IconButton,
  InputAdornment,
  ThemeProvider,
  Checkbox,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import theme from "../themes/authThemes.js";

import details from "../config.json";

const categories = details.categories;
const sizes = details.sizes;
const colors = details.colors;

const PostAd = () => {
  const [adData, setAdData] = useState({
    category: "",
    tags: [],
    size: "",
    color: "",
    name: "",
    description: "",
    brand: "",
    condition: "",
    quantity: 1,
    price: "",
    endDate: "",
    modeOfAd: "",
  });

  const [files, setFiles] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "price") {
      if (value >= 0) {
        setAdData({ ...adData, [name]: value });
      }
    } else {
      setAdData({ ...adData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleFileChange = (event, index) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    setAdData((prevAdData) => {
      const newTags = checked
        ? [...prevAdData.tags, value]
        : prevAdData.tags.filter((tag) => tag !== value);
      return { ...prevAdData, tags: newTags };
    });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!adData.name) {
      isValid = false;
      newErrors.name = "Ad title is required";
    }

    if (!adData.price) {
      isValid = false;
      newErrors.price = "Price is required";
    }

    if (!adData.condition) {
      isValid = false;
      newErrors.condition = "Please select new or used as condition";
    }

    if (!adData.category) {
      isValid = false;
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    Object.keys(adData).forEach((key) => {
      if (Array.isArray(adData[key])) {
        adData[key].forEach((value) => formData.append(key, value));
      } else {
        formData.append(key, adData[key]);
      }
    });
    formData.append("seller", user);
    files.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    try {
      const response = await fetch("http://localhost:5003/sell", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Submission Success:", result);
        navigate("/shop");
      } else {
        console.error("Submission Failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const subcategories = adData.category ? categories[adData.category] : [];

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          edge="start"
          sx={{ margin: "10px" }}
        >
          <img
            src="backIcon.png"
            alt="Back Icon"
            style={{
              width: 65,
              height: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          />
        </IconButton>

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
            <Typography
              variant="h6"
              sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}
            >
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
              {errors.category && (
                <Typography color="error" variant="caption">
                  {errors.category}
                </Typography>
              )}
            </Box>

            {/* tags Section */}
            {adData.category && (
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
            )}

            <Typography
              variant="h6"
              sx={{ mb: 2, alignSelf: "flex-start", color: "slategrey" }}
            >
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
                <FormControlLabel
                  value="old"
                  control={<Radio />}
                  label="Used"
                />
              </RadioGroup>
              {errors.condition && (
                <Typography color="error" variant="caption">
                  {errors.condition}
                </Typography>
              )}
            </FormControl>

            {/* Price, Date, and Photo Upload Section */}

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

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                my: 2,
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                {[...Array(5)].map((_, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <IconButton
                      color={files[index] ? "default" : "primary"}
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(event) => handleFileChange(event, index)}
                      />
                      <PhotoCamera />
                    </IconButton>
                    {files[index] && (
                      <Box sx={{ mt: 2 }}>
                        <img
                          src={URL.createObjectURL(files[index])}
                          alt={`upload-preview-${index}`}
                          style={{ width: "100%", height: 80 }} // size of displayed uploaded image
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
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
              onClick={handleSubmit}
            >
              Post Now
            </Button>
          </Box>
        </Container>
        {/* </div> */}
      </Box>
    </ThemeProvider>
  );
};

export default PostAd;
