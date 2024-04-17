import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Button, Container, ThemeProvider, Typography } from "@mui/material";
import theme from "../themes/homeTheme.js";
import AdDetails from "../components/adDetails.jsx";
import CategorySelection from "../components/categorySelection.jsx";
import Specifications from "../components/specifications.jsx";
import ConditionSelection from "../components/conditionSelection.jsx";
import TagSelection from "../components/tagSelection.jsx";
import details from "../config.json";
import BackHanger from "../components/backHanger.jsx";

// this page is used by the user to edit an existing ad
const EditAd = () => {
  const [adData, setAdData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // if the user is not logged in, redirect to the login page
    if (!user || !token) {
			console.log("Username or token not available.");
			navigate("/login");
		}
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

      
      try {
        const response = await fetch(`https://api.secondtimearound.xyz/shop/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdData(data);
          if (data.seller !== user) {
            // If seller is not the same as the user, redirect to the profile page
            toast.error("You are not authorized to edit this ad.");
            navigate("/profile");
            return;
          }
          else {
            // console.log("EDIT ALLOWED seller is the same as the user [", data.seller, "] is same as [", user,"]")
          }
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

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "category") {
      // clear tags, size, and color when changing the category
      setAdData(prevAdData => ({
        ...prevAdData,
        category: value,
        tags: [], 
        size: "",
        color: "",
        name: prevAdData.name, 
        description: prevAdData.description,
        brand: prevAdData.brand,
        condition: prevAdData.condition,
      }));
    } else {
      setAdData(prevAdData => ({ ...prevAdData, [name]: value }));
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateAd()) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
  
    const updatedData = {
      name: adData.name,
      description: adData.description,
      brand: adData.brand,
      category: adData.category,
      tags: adData.tags,
      condition: adData.condition,
    };
  
    if (adData.category === "Clothing") {
      updatedData.size = adData.size;
      updatedData.color = adData.color;
    }
  
    try {
      // send a PATCH request to update the ad on the backend
      const response = await fetch(`https://api.secondtimearound.xyz/shop/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
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
    let newErrors = {};
    let isValid = true;
  
    if (!adData.name) {
      isValid = false;
      newErrors.name = "Ad title is required";
    }
  
    if (!adData.brand) {
      isValid = false;
      newErrors.brand = "Brand is required";
    }
  
    if (!adData.category) {
      isValid = false;
      newErrors.category = "Category is required";
    }
  
    if (!adData.condition) {
      isValid = false;
      newErrors.condition = "Condition is required";
    }
  
    if (adData.category === "Clothing") {
      if (!adData.size) {
        isValid = false;
        newErrors.size = "Size is required for Clothing category";
      }
  
      if (!adData.color) {
        isValid = false;
        newErrors.color = "Color is required for Clothing category";
      }
    }
  
    if (!Array.isArray(adData.tags)) {
      isValid = false;
      newErrors.tags = "Tags must be an array";
    }
  
    setErrors(newErrors);
    return isValid;
  };
  

  if (!isDataFetched) {
    return <div>Loading...</div>;
  }
  
  if (isDataFetched && !adData) {
    return <div>Ad not found</div>;
  }

  if (isDataFetched)
  {
    console.log(adData);
  }


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: theme.palette.secondary.main  }}>
        <Container component="main" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "auto", py: 4, backgroundColor: theme.palette.secondary.main, p:5 }}>
          <BackHanger style={{ margin: "10px" , alignSelf: "flex-start"}} onClick={navigateToProfile} />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%", maxWidth: 700, bgcolor: "background.default", borderRadius: 2, boxShadow: 1, p: 5 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
              Edit Your Ad
            </Typography>
            <CategorySelection categories={details.categories} adData={adData} handleInputChange={handleInputChange} errors={errors} disabled />
            <TagSelection subcategories={details.categories[adData.category]} adData={adData} handleTagChange={handleTagChange} theme={theme} />
            {adData.category === "Clothing" && (
							<>
								<Specifications adData={adData} handleInputChange={handleInputChange} sizes={details.sizes} colors={details.colors} />
							</>
						)}
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
