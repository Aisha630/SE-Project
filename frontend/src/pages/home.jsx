import React from 'react';
import { Box, Typography, Grid, ThemeProvider } from '@mui/material';
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
			<Box display="flex" width="100%" height="100vh" flexDirection="column" alignItems="stretch" alignContent="center" sx={{ backgroundColor: "#ffffff" }}>

				{/* The following Box is for the navigation bar and renders navbar according to screen size */}
				{
					lgd || c ? <Box>
						<Nav Drawer={MyDrawer} Search={Box} />
					</Box> : <Box>
						<Nav Drawer={Box} Search={Box} />
					</Box>
				}

				{/* This is grid is for the main content of the Home page */}
				<Grid container spacing={1} sx={{ padding: 1, maxWidth: "100%", boxSizing: "border-box" }}>

					{/* The following Grid item is for the side panel and renders the side panel according to screen size */}
					{lgd ? <></> :
						<Grid item xs={1} sm={1} md={2} lg={2} sx={{ backgroundColor: "#e0e0e0", alignItems: "stretch", height: "100vh" }}>
							{
								lgd ? <></> : <>
									<Box sx={{ width: "90%", mr: { xs: '3px', sm: "5px", md: "8px" }, minWidth: { xs: '100px', sm: '120px', md: '150px' } }}>
										<SidePanel ListStyles={{ ml: { xs: '1px', sm: "3px", md: "5px" }, }} ListItemStyles={{ fontWeight: "bold", mt: "5px" }} ListButtonStyles={{ margin: "8px" }} pageOn={"Home"} />
									</Box>
								</>
							}
						</Grid>
					}

					{/* The following Grid item is for the carousel and heading */}
					<Grid item xs={12} sm={12} md={12} lg={10} sx={{ backgroundColor: "#ffffff", maxWidth: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", mx: "auto" }}>

						<Typography variant={lg ? "h4" : md ? "h5" : "h6"} noWrap sx={{ lineHeight: '1.25', textAlign: 'left', ml: lg ? 10 : "30px", mt: 5, }}>
							<span style={{ color: '#E57373', fontWeight: 'bold' }}>NEW</span><br />
							<span style={{ display: 'block' }}>
								<span style={{ color: '#58a75b', fontSize: "20px" }}>in </span>
								<span style={{ color: '#58a75b' }}>Store</span>
							</span>
						</Typography>

						{/* The following Box is for the carousel */}
						<Box sx={{ width: md ? "100%" : "90%", mb: 0, paddingBottom: 0, ml: lg ? 10 : 5, mr: "auto", maxWidth: "100%", boxSizing: "border-box", display: "flex", justifyContent: "center" }}>
							<CarouselComponent />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</ThemeProvider >
	);
}

export default Home;
