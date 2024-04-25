import React from 'react';
import { Box, Typography, Grid, ThemeProvider, Card, CardContent } from '@mui/material';
import CarouselComponent from '../components/carousel.jsx';
import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.jsx';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ColorText({ text, color, fontWeight }) {
	return (
		<span style={{ color: color, fontWeight: fontWeight }}>{text}</span>
	)
}

function Home() {
	const token = useSelector((state) => state.auth.token);
	const username = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));
	const lg = useMediaQuery(theme.breakpoints.between('md', 'xl'));

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

	return (
		<ThemeProvider theme={theme}>
			<Nav Search={Box} position='relative' />

			{/* The following Box is the main container for the Home page */}
			<Box style={{
				minHeight: '100vh',
				backgroundImage: "url('Group 17.svg')",
				backgroundSize: "cover",
				maxWidth: "100%",
				backgroundAttachment: "scroll",

			}}>
				{/* Text and carousel */}
				<Grid conatiner spacing={1}>
					<Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", pt: 5 }}>
						<Box sx={{ maxWidth: "70%", mt: 5, mb: 1 }}>
							<Typography variant={lg ? "h4" : md ? "h5" : "h6"} noWrap sx={{ lineHeight: '1', textAlign: 'right' }}>
								<span style={{ color: '#345744', fontWeight: 'bold', textAlign: "left" }}>NEW</span><br />
								<span style={{ display: 'block', textAlign: "right" }}>
									<span style={{ color: '#345744', fontSize: "20px" }}>in </span>
									<span style={{ color: '#345744' }}>Store</span>
								</span>
							</Typography>
							<CarouselComponent />
						</Box>
					</Grid>
				</Grid>

				{/* Text about site and image */}
				<Grid container spacing={1} sx={{ mt: 0, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
					{/* The Flower thingy image*/}
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{mt:15}}>
						<img src={"/hp1.svg"} alt="Description" style={{ maxWidth: "80%" }} />
					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{ m: 0 }}>
						<Typography variant={lg ? "h4" : "h5"} sx={{ lineHeight: '1', textAlign: 'left', m:5 }}>
							Some text about why the website is supposed to be cool. {' '}
							<ColorText text={"We care about sustainability"} fontWeight={650} color={"#66C659"} />...
							do you?
						</Typography>
					</Grid>
				</Grid>

				{/* Cards */}
				{/* Card 1 */}
				<Grid container spacing={1} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{ justifyContent: "center", display: "flex", flexDirection: "row", alignItems: "center" }}>
						<Card sx={{ backgroundColor: "#6A9B81", borderRadius: "16px", maxWidth: "80%", p: 4 }}>
							<CardContent sx={{}}>
								<Typography variant={lg ? "h4" : "h5"} sx={{ textAlign: 'center', fontWeight: 700, color: "white", lineHeight: "1.5", m: 2 }}>Buy Cheaper</Typography>
								<Typography variant={lg ? "h4" : "h5"} sx={{ fontWeight: 300, textAlign: 'center', lineHeight: "1.5", color: "white", p: 2 }}>Browse our items for <strong>sale</strong>, <strong>bidin an auction</strong> , or <strong>request a donation</strong></Typography>
							</CardContent>
						</Card>
					</Grid>

				{/* Card 2 and above text */}
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center", pb:10}}>
							<Typography variant={lg ? "h4" : "h5"} sx={{ lineHeight: '1.5', textAlign: "left", mb: 3, m:5}}>
								Feeling like a broke college student? <ColorText text={"We got you"} fontWeight={650} color={"#66C659"} />
							</Typography>
							<Card sx={{ backgroundColor: "#6A9B81", borderRadius: "16px", maxWidth: "80%", p: 4 }}>
								<CardContent>
									<Typography variant={lg ? "h4" : "h5"} sx={{ textAlign: 'center', fontWeight: 700, color: "white", lineHeight: "1.5", m: 2 }}>Sell Cheap</Typography>
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
