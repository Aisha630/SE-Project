import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Container, Typography, ThemeProvider, } from "@mui/material";
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
import 'react-image-crop/dist/ReactCrop.css';
import BackHanger from "../components/backHanger.jsx";

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
		price: "",
		productType: "",
		startingBid: "",
		endTime: "",
	});

	const [files, setFiles] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		if (name === "category") {
			console.log("category changed");
			setAdData({
				category: value,
				tags: [],
				size: "",
				color: "",
				name: "",
				description: "",
				brand: "",
				condition: "",
				price: "",
				productType: "",
				startingBid: "",
				endTime: "",
			});
		} else {
			setAdData((prevAdData) => {
				if (name === "price" || name === "startingBid") {
					if (value >= 0) {
						return {
							...prevAdData,
							[name]: value,
						};
					} else {
						return {
							...prevAdData,
							[name]: prevAdData[name],
						};
					}
				} else {
					return {
						...prevAdData,
						[name]: value,
					};
				}
			});
		}

		if (errors[name]) {
			setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
		}
	};


	const handleFileChange = (event, index) => {
		const newFiles = [...files];
		if (event.target.files && event.target.files[0]) {
			newFiles[index] = event.target.files[0];
			setFiles(newFiles);
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

		if (adData.productType === 'sale' && !adData.price) {
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
		const formData = new FormData();
		Object.keys(adData).forEach((key) => {
			if (key === "price" && (adData.productType === "auction" || adData.productType === "donate")) {
				return;
			}

			if ((key === "size" || key === "color") && adData.category !== "Clothing") {
				return;
			}

			if ((key === "startingBid" || key === "endTime") && adData.productType !== "auction") {
				return;
			}
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
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Submission Success:", result);
				navigate("/shop");
			} else {
				const errorData = await response.json();
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
			<Box style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", }} >
				<Container component="main" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "auto", py: 4, backgroundColor: theme.palette.secondary.main, }}>
					<BackHanger style={{ margin: "10px" , alignSelf: "flex-start"}} />
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1, p: 3, }}>
						<Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
							Post Your Ad
						</Typography>

						<CategorySelection categories={categories} adData={adData} handleInputChange={handleInputChange} errors={errors} />

						{adData.category && (
							<TagSelection subcategories={subcategories} adData={adData} handleTagChange={handleTagChange} theme={theme} />
						)}

						{adData.category === "Clothing" && (
							<>
								<Specifications adData={adData} handleInputChange={handleInputChange} sizes={sizes} colors={colors} />
							</>
						)}

						<ModeOfAdSelection adData={adData} handleInputChange={handleInputChange} />

						<AdDetails adData={adData} handleInputChange={handleInputChange} errors={errors} />

						<ConditionSelection adData={adData} handleInputChange={handleInputChange} errors={errors} />

						{adData.productType !== "auction" && adData.productType !== "donate" && (
							<PriceSelection adData={adData} handleInputChange={handleInputChange} errors={errors} />
						)}

						<ImageUpload files={files} handleFileChange={handleFileChange} errors={errors} />

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 2, bgcolor: "primary.main", color: "white", }} onClick={handleSubmit}>
							Post Now
						</Button>
					</Box>
				</Container>
			</Box>
		</ThemeProvider>
	);
};

export default PostAd;
