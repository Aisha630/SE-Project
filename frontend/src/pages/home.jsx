import React from 'react';
import { Box, Typography, Grid, ThemeProvider, Card, CardContent } from '@mui/material';
import CarouselComponent from '../components/carousel.jsx';
import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.jsx';
import SidePanel from '../components/sidePanel.jsx';
import { useMediaQuery } from '@mui/material';
import MyDrawer from '../components/drawer.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
	const token = useSelector((state) => state.auth.token);
	const username = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));
	const lg = useMediaQuery(theme.breakpoints.between('md', 'xl'));
	const lgd = useMediaQuery(theme.breakpoints.down('lg'));
	const c = useMediaQuery(theme.breakpoints.down("950")); // Custom breakpoint for the drawer in navbar

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
			{/* The following Box is the main container for the Home page */}
			<Box style={{
				minHeight: '100vh',
				backgroundImage: "url('homebg.svg')",
				backgroundSize: "cover",
				maxWidth: "100%",
				backgroundAttachment: "scroll",


			}}>
				<Grid conatiner spacing={1}>
					<Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Box sx={{ maxWidth: "70%", mt: 5 }}>
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
				<Grid container spacing={3} sx={{ mt: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
					{/* Second Grid item */}
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{}}>
						<img src={"/hp1.svg"} alt="Description" style={{ maxWidth: '55%', }} />
					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{ m: 10 }}>
						<Typography variant={lg ? "h4" : "h5"} sx={{ lineHeight: '1', textAlign: 'right' }}>
							Some text about why the website is supposed to be cool. We care about sustainability... do you?
						</Typography>
					</Grid>
				</Grid>
				<Grid container spacing={3} sx={{  display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent:"center"}}>
					{/* Second Grid item */}
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{justifyContent:"center", display:"flex", flexDirection:"row", alignItems:"center"}}>
						<Card sx={{ backgroundColor: "#7FB378", borderRadius:"16px", maxWidth:"80%",p:4}}>
							<CardContent sx={{}}>
								<Typography variant={lg ? "h4" : "h5"} sx={{ textAlign: 'center', fontWeight:700, color:"white" , lineHeight:"1.5",m:2 }}>Buy Cheaper</Typography>
								<Typography variant={lg ? "h4" : "h5"} sx={{ fontWeight:300, textAlign: 'center', lineHeight:"1.5" , color:"white", p:2}}>Browse our items for sale, bid in an auction, or request a donation</Typography>
							</CardContent>
						</Card>

					</Grid>
					<Grid item xs={12} sm={6} md={6} lg={5} sx={{justifyContent:"center", display:"flex", flexDirection:"column" , alignItems:"center", pb:10}}>
						<Typography variant={lg ? "h4" : "h5"} sx={{ lineHeight: '1.5', textAlign: "left", pt:20, pb:4, ml:8}}>
						Feeling like a broke college student? We got you
						</Typography>
					<Card sx={{ backgroundColor: "#7FB378", borderRadius:"16px", maxWidth:"80%", p:4 }}>
							<CardContent>
								<Typography variant={lg ? "h4" : "h5"} sx={{ textAlign: 'center', fontWeight:700, color:"white" , lineHeight:"1.5",m:2 }}>Sell Cheap</Typography>
								<Typography variant={lg ? "h4" : "h5"} sx={{ fontWeight:300, textAlign: 'center', lineHeight:"1.5" , color:"white", p:2}}>Put up an ad to sell, auction, or even donate an item to a fellow LUMS student</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</ThemeProvider >
	);
}

export default Home;
