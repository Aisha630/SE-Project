import { React, useState, useEffect } from 'react';
import { Grid, Typography, Paper, ThemeProvider, useMediaQuery, TextField, Divider, Rating, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomImageGallery } from '../components/imageGallery.jsx';
import { toast } from 'react-toastify';
import Nav from '../components/nav.jsx';
import SiteButton from '../components/button.jsx';
import { useCart } from '../context/cartContext.jsx';
import theme from '../themes/homeTheme.js';
import "../css/image-gallery.css";
import Recs from '../components/recs.jsx';
import MyDrawer from '../components/drawer.jsx';

// This component is used to display the details of a product
const DetailItem = ({ label, value, lg }) => (
	<Grid container columnSpacing={2} alignItems="center">
		<Grid item xs={6}>
			<Typography variant={lg ? "subtitle1" : "subtitle2"} gutterBottom textAlign="left" sx={{ color: "gray", mt: 1, mb: 1, fontWeight: 400 }}>
				{label}
			</Typography>
		</Grid>
		<Grid item xs={6}>
			<Typography variant={lg ? "subtitle1" : "subtitle2"} gutterBottom textAlign="right" sx={{ textTransform: "capitalize", mt: 2, mb: 2, fontWeight: 400 }}>
				{value}
			</Typography>
		</Grid>
	</Grid>
);

const ProductDetails = () => {
	const [product, setProduct] = useState();
	const [bid, setBid] = useState('');
	const [seller, setSeller] = useState({});
	const [rating, setRating] = useState(0);
	const [requestDescription, setRequestDescription] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);
	const { fetchCartItems } = useCart();
	const lg = useMediaQuery(theme.breakpoints.up('sm'));

	const productDetails = product ? [
		{ label: 'Condition', value: product.condition },
		{ label: 'Brand', value: product.brand },
		{ label: 'Size', value: product.size },
	] : [];

	const handleRatingChange = (event) => {
		rateUser(event.target.value);
	}

	// Sends a request to the server to rate the seller with the given rating
	const rateUser = (rating) => {
		fetch(`http://localhost:5003/rate/${seller._id}`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ newRating: rating }),
		}).then(res => {
			if (!res.ok) {
				return res.json().then(data => {
					throw new Error(data.error || 'Failed to rate the seller');
				});
			}
			return res.json();
		}).then(data => {
			setRating(data.averageRating);
			toast.success("Successfully rated the seller");
		}).catch(error => {
			toast.error(error.message || "Error rating the seller");
		});
	}

	// Fetches the product details from the server using the product ID in the URL parameters
	useEffect(() => {
		fetch(`http://localhost:5003/shop/${id}`, {
			headers: { 'Authorization': `Bearer ${token}` }
		}).then(response => {
			if (!response.ok)
				navigate("/login")
			return response.json()
		}).then(data => {
			// Format the image URLs to be used in the image gallery
			const formattedImages = data.images.map((imageUrl) => ({
				original: `http://localhost:5003${imageUrl}`,
				thumbnail: `http://localhost:5003${imageUrl}`,
			}));
			setProduct({ ...data, images: formattedImages })

		}).catch(error => { console.log(error) })
	}, [token, id, navigate]);

	// Fetches the seller details from the server using the seller username from the product details
	useEffect(() => {
		const getSeller = () => {
			fetch(`http://localhost:5003/profile?username=${product?.seller}`, {
				method: 'GET',
				headers: { 'Authorization': `Bearer ${token}` },
			}).then(response => {
				return response.json()
			}).then(data => {
				if (!data.error) {
					setSeller(data);
					setRating(data.rating.rating);
				}
				else
					throw new Error(data.error);
			}
			).catch(error => { console.log(error); toast.error(error || "Error fetching seller details")})
		}
		if (product?.seller) { getSeller() }
	}, [product?.seller, token, navigate])

	const addToCart = (product) => {
		fetch(`http://localhost:5003/cart`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: product._id }),
			credentials: 'include'
		}).then(response => {
			fetchCartItems();
			if (response.ok)
				toast.success(`${product.name} added to cart`);
			return response.json();
		}).then(data => {
			if (data.error)
				toast.error(data.error);
		}).catch(error => {
			console.log(error)
			toast.error("Error adding to cart")
		})
	}

	const placeBid = () => {
		fetch(`http://localhost:5003/shop/${id}/bid`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bid }),
			credentials: 'include',
		})
			.then(response => response.json())
			.then(data => {
				if (data.error) {
					toast.error(data.error);
				} else {
					toast.success(`Bid placed: PKR ${bid}`);
					setProduct({ ...product, currentBid: bid });
				}
			})
			.catch(error => {
				console.error(error);
				toast.error("Error placing bid");
			});
	};

	const sendDonationRequest = () => {
		if (!requestDescription.trim()) {
			toast.error("Request description cannot be empty.");
			return;
		}

		fetch(`http://localhost:5003/shop/${id}/request`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ requestDescription }),
			credentials: 'include',
		})
			.then(response => {
				if (response.ok) {
					toast.success("Donation request sent successfully.");
					setRequestDescription('');
				} else {
					response.json().then(data => {
						toast.error(data.error || "An error occurred while sending the request.");
					});
				}
			})
			.catch(error => {
				console.error(error);
				toast.error("An error occurred while sending the request.");
			});
	};

	const buttonAction = product?.__t === 'AuctionProduct' ? placeBid : (product?.__t === 'DonationProduct' ? sendDonationRequest : () => addToCart(product));
	const buttonText = product?.__t === 'AuctionProduct' ? 'Place Bid' : (product?.__t === 'DonationProduct' ? 'Send Request' : 'Add to Cart');

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={0} sx={{ m: 0, p: 0, width: "100%" }}>

				<Nav Drawer={MyDrawer} Search={Box} pageOn={""} />

				{/*Image gallery component*/}
				<Grid item xs={12} sm={12} md={12} lg={6} >
					<CustomImageGallery items={product ? product.images : []} sx={{ boxShadow: "none" }} />
				</Grid>

				{/*Product details component*/}
				<Grid item xs={12} sm={12} md={12} lg={6} sx={{ display: "flex", flexDirection: "row", alignItems: "stretch", m: 0, p: 0 }}>
					<Paper sx={{ padding: 7, flex: 1, borderRadius: 0 }}>

						{/*Different product details*/}
						<Typography variant="h5" color="black" textAlign="left" sx={{ fontWeight: 500, mb: 0, textTransform: 'capitalize' }}>
							{product?.name}
						</Typography>
						{product?.__t === 'SaleProduct' && (
							<Typography variant={lg ? "h6" : "subtitle1"} color="black" textAlign="left" sx={{ fontWeight: 500, mb: 4 }}>
								{product && `PKR ${product.price}`}
							</Typography>
						)}
						{productDetails.map((detail, index) => (
							detail.value ? <DetailItem key={index} label={detail.label} value={detail.value} lg={lg} /> : <></>
						))}

						<DetailItem label="Seller" value={product?.seller} lg={lg} />

						{/* Seller Rating */}
						<Grid container columnSpacing={2} alignItems="center">
							<Grid item xs={6}>
								<Typography variant={lg ? "subtitle1" : "subtitle2"} gutterBottom textAlign="left" sx={{ color: "gray", mt: 1, mb: 1, fontWeight: 400 }} > Seller Rating: </Typography>
							</Grid>
							<Grid item xs={6} sx={{ textAlign: 'right', mt: 1, mb: 1 }}>
								<Rating name="half-rating-read" value={rating} precision={0.25} size={lg ? 'large' : 'medium'} onChange={handleRatingChange} sx={{
									'& .MuiRating-iconFilled': {
										color: '#e87975',
									},
									'& .MuiRating-iconHover': {
										color: '#e87975',
									},

								}} />
							</Grid>
						</Grid>

						{/* Bid and Donation Request */}
						{product?.__t === 'AuctionProduct' && (
							<>
								<Typography variant={"subtitle1"} color="black" textAlign="left" sx={{ fontWeight: 300, mb: 2 }}>
									Starting Bid: PKR {product.startingBid}
								</Typography>
								<Typography variant={"subtitle1"} color="black" textAlign="left" sx={{ fontWeight: 300, mb: 2 }}>
									Current Bid: PKR {product.currentBid}
								</Typography>
								<Typography variant={"subtitle1"} color="black" textAlign="left" sx={{ fontWeight: 300, mb: 2 }}>
									End Time: {new Date(product.endTime).toLocaleString()}
								</Typography>
								<TextField
									label="Your Bid"
									type="number"
									fullWidth
									value={bid}
									onChange={(e) => setBid(e.target.value)}
									margin="normal"
									theme={theme}
								/>
							</>
						)}
						{product?.__t === 'DonationProduct' && (
							<>
								<TextField
									label="Donation Request Description"
									multiline
									rows={4}
									fullWidth
									value={requestDescription}
									onChange={(e) => setRequestDescription(e.target.value)}
									margin="normal"
								/>
							</>
						)}

						{/* Add to Cart/Place Bid/Request donation button */}
						<SiteButton disabled={seller.username === user} text={buttonText} onClick={buttonAction} styles={{ width: '100%', mt: 3, mb: 3, fontSize: lg ? "1rem" : "0.8rem", padding: 1.5, }} />

						{/* Product Description */}
						<Typography variant="h6" textAlign="left" sx={{ mt: 3, color: "gray" }}>
							Description
						</Typography>
						<Typography variant={lg ? "subtitle1" : "subtitle2"} textAlign="left" sx={{ mt: 2, fontWeight: 400 }}>
							{product?.description}
						</Typography>
					</Paper>
				</Grid>

				{/* Recommendations */}
				<Grid container spacing={0} sx={{ padding: 3.5, backgroundColor: "#ffffff" }}>
					<Grid item xs={12} sm={12} md={12} lg={12} sx={{ maxWidth: "100%" }}>
						<Divider sx={{ width: "100%", mt: 5, mb: 5 }} />
						<Typography variant="h5" textAlign="left" sx={{ mb: 3, color: "#58a45b", ml: 5, fontWeight: 450 }}>
							More like this
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 3 }}>
						{product && <Recs productType={product.__t}/>}
					</Grid>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};


export default ProductDetails;
