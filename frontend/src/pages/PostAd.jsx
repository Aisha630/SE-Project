import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import theme from "../themes/authThemes.js";
import { toast } from "react-toastify";
import details from "../config.json";
import AdDetails from "../components/adDetails.jsx";
import CategorySelection from "../components/categorySelection.jsx";
import ModeOfAdSelection from "../components/adModeSelection.jsx";
import Specifications from "../components/specifications.jsx";
import ConditionSelection from "../components/conditionSelection.jsx";
import PriceSelection from "../components/priceSelection.jsx";
import ImageUpload from "../components/imageUpload.jsx";
import TagSelection from "../components/tagSelection.jsx";

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
    // quantity: 1,
    price: "",
    // endDate: "",
    productType: "",
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

  const validateAd = () => {
    let newErrors = {};
    let isValid = true;

    if (!adData.category) {
      isValid = false;
      newErrors.category = "Category is required";
    }

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

    if (!adData.productType) {
      isValid = false;
      newErrors.productType = "Please select a mode of ad";
    }

    if (!adData.brand) {
      isValid = false;
      newErrors.brand = "Brand is required";
    }

    if (!adData.description) {
      isValid = false;
      newErrors.description = "Description must be non-empty";
    }

    if (files.length === 0) {
      isValid = false;
      newErrors.images = "At least one image must be uploaded.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateAd()) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    console.log("Ad data is ", adData);

    const formData = new FormData();
    Object.keys(adData).forEach((key) => {
      if (Array.isArray(adData[key])) {
        adData[key].forEach((value) => formData.append(key, value));
      } 
      
      else {
        if (!((key==="size" || key==="color") && adData.category === "Technology" ))
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
      } else if (response.status === 401) {
        toast.error("You need to log in to post an ad.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Submission Failed:", errorData.error);
        toast.error(`Submission Failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error occurred. Please try again later.");
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
            <CategorySelection
              categories={categories}
              adData={adData}
              handleInputChange={handleInputChange}
              errors={errors}
            />

            {/* tags Section */}
            {adData.category && (
              <TagSelection
                subcategories={subcategories}
                adData={adData}
                handleTagChange={handleTagChange}
                theme={theme}
              />
            )}

            {adData.category === "Clothing" && (
              <>
                {/* Specifications Section inside the green box */}
                <Specifications
                  adData={adData}
                  handleInputChange={handleInputChange}
                  sizes={sizes}
                  colors={colors}
                />
              </>
            )}

            {/* Mode of Ad Section */}
            <ModeOfAdSelection
              adData={adData}
              handleInputChange={handleInputChange}
            />

            {/* Ad Details Section */}
            <AdDetails
              adData={adData}
              handleInputChange={handleInputChange}
              errors={errors}
            />

            {/* Condition Section */}
            <ConditionSelection
              adData={adData}
              handleInputChange={handleInputChange}
              errors={errors}
            />

            {/* Price Section */}
            <PriceSelection
              adData={adData}
              handleInputChange={handleInputChange}
              errors={errors}
            />

            {/* Image Upload Section */}
            <ImageUpload files={files} handleFileChange={handleFileChange} />

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
      </Box>
    </ThemeProvider>
  );
};

export default PostAd;
