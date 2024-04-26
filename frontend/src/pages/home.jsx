import React, { useState } from 'react';
import { Box, Typography, Grid, ThemeProvider, Card, CardContent } from '@mui/material';
import CarouselComponent from '../components/carousel.jsx';
import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.jsx';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SellButton from '../components/sellButton.jsx';

function ColorText({ text, color, fontWeight }) {
	return (
		<span style={{ color: color, fontWeight: fontWeight }}>{text}</span>
	)
}

function Home() {
	const token = useSelector((state) => state.auth.token);
	const username = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const lg = useMediaQuery(theme.breakpoints.between('md', 'xl'));
	const [carouselLoaded, setCarouselLoaded] = useState(false);

	{/* This useEffect hook is used to check if the user is logged in or not. If the user is not logged in, the user is redirected to the login page. */ }
	useEffect(() => {
		if (!username || !token) {
			console.log("Username or token not available.");
			navigate("/login");
		}
		fetch(`http://localhost:5003/profile?username=${username}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		})
			.then((res) => {
				if (!res.ok) {
					navigate("/login");
				}
			})
			.catch((error) => { console.log(error) });
	}, [token, username, navigate])

	function handleCarouselLoad() {
		console.log(carouselLoaded);
		setCarouselLoaded(true);
	}

	useEffect(() => handleCarouselLoad());

	useEffect(() => {
		const timer = setTimeout(() => {
			AOS.init({
				duration: 1200,
				mirror: false,
			});
			AOS.refresh();
		}, 1000);

		return () => clearTimeout(timer);
	}, [carouselLoaded]);

	return (
		<ThemeProvider theme={theme}>
			<Nav Search={Box} position='relative' color="secondary.dark" />
			<SellButton />
			{/* The following Box is the main container for the Home page */}
			<Box style={{
				minHeight: '100vh',
				backgroundImage: "url('homebg.svg')",
				backgroundSize: "cover",
				maxWidth: "100%",
				maxHeight: "100%",
				backgroundRepeat: 'no-repeat',
				backgroundAttachment: "scroll",
			}}>
				{/* Text and carousel */}
				<Box sx={{ maxWidth: "100%", textAlign: 'center' }}>

					<Typography variant="h4" component="h1" sx={{ color: 'black', fontWeight: 'gray', p: 2 }}>
						SECOND TIME AROUND
					</Typography>

					<Typography variant="h5" component="h2" sx={{ color: '#345644', fontWeight: 'medium', mt: -1 }}>
						New in Store
					</Typography>
				</Box>

				<Grid container spacing={1} sx={{ minHeight: '60vh' }}>
					<Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", pt: 5 }}>
						<Box sx={{ maxWidth: "70%" }}>
							<CarouselComponent onLoad={handleCarouselLoad} />
						</Box>
					</Grid>
				</Grid>

				{/* Text about site and image */}
				{carouselLoaded &&
					<Grid container spacing={1} data-aos="fade-up" sx={{ mt: 10, mb: 2, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
						{/* The Flower thingy image*/}
						<Grid item xs={12} sm={6} md={6} lg={5} sx={{ mb: 0 }} >
							<img src={"/hp1.svg"} alt="Description" style={{ maxWidth: "70%", maxHeight: '100%' }} />
						</Grid>
						<Grid item xs={12} sm={6} md={6} lg={5} sx={{ m: 0 }}>
							<Typography variant={lg ? "h4" : "h5"} sx={{ lineHeight: '1.5', textAlign: 'left', m: 5 }}>
								Join our marketplace where sustainability matters – {' '}
								<ColorText text={"because we care "} fontWeight={650} color={"#66C659"} />...
								do you?
							</Typography>
						</Grid>
					</Grid>
				}
				{carouselLoaded &&
					<Grid container spacing={1} data-aos="fade-up" sx={{ mt: 2, mb: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
						{/* The OTHER Flower thingy image*/}
						<Grid item xs={12} sm={6} md={6} lg={5} sx={{ m: 0 }}>
							<Typography variant={lg ? "h4" : "h5"} sx={{ lineHeight: '1.5', textAlign: 'right', m: 5 }}>

								Innovative {' '}
								<ColorText text={"student-built "} fontWeight={650} color={"#66C659"} /> platform for conscious consumption, connecting sellers and buyers who {' '}
								<ColorText text={"care about positive impact."} fontWeight={650} color={"#66C659"} />
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={6} lg={5} sx={{ mb: 0 }} >
							<img src={"/hp2.svg"} alt="Description" style={{ maxWidth: "70%", maxHeight: '100%' }} />
						</Grid>
					</Grid>
				}

				{/* Cards */}
				{/* Card 1 */}
				<Grid container spacing={1} data-aos="fade-up" sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", mt: 5 }}>
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{ justifyContent: "center", display: "flex", flexDirection: "row", alignItems: "center" }}>
						<Card sx={{ backgroundColor: "#6A9B81", borderRadius: "16px", maxWidth: "80%", p: 4 }}>
							<CardContent sx={{}}>
								<Typography variant={lg ? "h4" : "h5"} sx={{ textAlign: 'center', fontWeight: 700, color: "white", lineHeight: "1.5", m: 2 }}>Buy Cheaper</Typography>
								<Typography variant={lg ? "h4" : "h5"} sx={{ fontWeight: 300, textAlign: 'center', lineHeight: "1.5", color: "white", p: 2 }}>Browse our items for <strong>sale</strong>, <strong>bid in an auction</strong> , or <strong>request a donation</strong></Typography>
							</CardContent>
						</Card>
					</Grid>

					{/* Card 2 and above text */}
					<Grid item xs={12} sm={6} md={6} lg={5} data-aos="fade-up" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center", pb: 20 }}>
						<Card sx={{ backgroundColor: "#6A9B81", borderRadius: "16px", maxWidth: "80%", p: 4 }}>
							<CardContent>
								<Typography variant={lg ? "h4" : "h5"} sx={{ textAlign: 'center', fontWeight: 700, color: "white", lineHeight: "1.5", m: 2 }}>Maximize profits</Typography>
								<Typography variant={lg ? "h4" : "h5"} sx={{ fontWeight: 300, textAlign: 'center', lineHeight: "1.5", color: "white", p: 2 }}>Put up an ad to <strong>sell</strong>, <strong>auction</strong>, or even <strong>donate</strong> an item to a fellow LUMS student</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>


		</ThemeProvider >
	);
}

export default Home;
