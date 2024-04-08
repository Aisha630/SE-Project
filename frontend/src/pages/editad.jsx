import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../themes/authThemes.js";
import AdDetails from "../components/adDetails.jsx";
import CategorySelection from "../components/categorySelection.jsx";
import ModeOfAdSelection from "../components/adModeSelection.jsx";
import Specifications from "../components/specifications.jsx";
import ConditionSelection from "../components/conditionSelection.jsx";
import ImageUpload from "../components/imageUpload.jsx";
import TagSelection from "../components/tagSelection.jsx";
import details from "../config.json";
import BackHanger from "../components/backHanger.jsx";

const EditAd = () => {
  const [adData, setAdData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAdData = async () => {
      if (!token) {
        toast.error("You must be logged in to edit ads.");
        navigate("/login");
        return;
      }

      if (!id) {
        toast.error("No ad ID provided.");
        navigate("/shop"); 
        return;
      }

      console.log(`Fetching data for ad with id: ${id}`);
      
      try {
        const response = await fetch(`http://localhost:5003/shop/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdData(data);
        } else {
          const errorData = await response.json();
          toast.error(`Failed to fetch ad details: ${errorData.error}`);
          navigate("/profile");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("An error occurred while fetching the ad details.");
        navigate("/profile");
      } finally {
        setIsDataFetched(true);
      }
    };

    fetchAdData();
  }, [id, token, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdData((prevAdData) => ({ ...prevAdData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAd()) {
      toast.error("Validation failed. Check the input fields.");
      return;
    }

    const updatedData = {
      name: adData.name,
      description: adData.description,
      brand: adData.brand,
      category: adData.category,
      tags: adData.tags,
      size: adData.size,
      color: adData.color,
      condition: adData.condition,
    };

    try {
        const response = await fetch(`http://localhost:5003/shop/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          });          

      if (response.ok) {
        toast.success("Ad updated successfully");
        navigate("/profile");
      } else {
        const errorData = await response.json();
        toast.error(`Update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating the ad:", error);
      toast.error("An error occurred while updating the ad.");
    }
  };

  const validateAd = () => {
    // to add valiation
    return true;
  };

  if (!isDataFetched) {
    return <div>Loading...</div>;
  }
  
  if (isDataFetched && !adData) {
    return <div>Ad not found</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Container component="main" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "auto", py: 4, backgroundColor: theme.palette.secondary.main }}>
          <BackHanger style={{ margin: "10px" , alignSelf: "flex-start"}} />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1, p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
              Edit Your Ad
            </Typography>

            <CategorySelection categories={details.categories} adData={adData} handleInputChange={handleInputChange} errors={errors} disabled />

            <TagSelection subcategories={details.categories[adData.category]} adData={adData} handleTagChange={handleInputChange} theme={theme} />

            <Specifications adData={adData} handleInputChange={handleInputChange} sizes={details.sizes} colors={details.colors} disabled={adData.category !== "Clothing"} />

            <AdDetails adData={adData} handleInputChange={handleInputChange} errors={errors} />

            <ConditionSelection adData={adData} handleInputChange={handleInputChange} errors={errors} />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 2, bgcolor: "primary.main", color: "white" }} onClick={handleSubmit}>
              Update Ad
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EditAd;
