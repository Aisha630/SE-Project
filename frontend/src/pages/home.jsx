import React from 'react';
import { Box, Typography, Grid, ThemeProvider } from '@mui/material';
import CarouselComponent from '../components/carousel.jsx';
import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.jsx';
import SidePanel from '../components/sidePanel.jsx';
import { useMediaQuery } from '@mui/material';
import Drawer from '../components/drawer.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const lg = useMediaQuery(theme.breakpoints.between('md', 'xl'));
  const lgd = useMediaQuery(theme.breakpoints.down('lg'));
  const c = useMediaQuery(theme.breakpoints.down("950"));
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user);

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
        console.log("Res is ", res); if (!res.ok) {
          navigate("/login");
        }
      })
      .catch((error) => { console.log(error) });
  }, [token, username, navigate])



  return (
    <ThemeProvider theme={theme}>

      <Box display="flex" width="100%" height="100vh" flexDirection="column" alignItems="stretch" alignContent="center" sx={{ backgroundColor: "#ffffff" }}>

        {
          lgd || c ? <Box>
            <Nav Drawer={Drawer} Search={Box} />
          </Box> : <Box>
            <Nav Drawer={Box} Search={Box} />
          </Box>
        }
        <Grid container spacing={1} sx={{ padding: 1, maxWidth: "100%", boxSizing: "border-box" }}>
          {lgd ? <></> :
            <Grid item xs={1} sm={1} md={2} lg={2} sx={{ backgroundColor: "#e0e0e0", alignItems: "stretch", height: "100vh" }}>
              {
                lgd ? <Box></Box> : <>
                  <Box sx={{ width: "90%", mr: { xs: '3px', sm: "5px", md: "8px" }, minWidth: { xs: '100px', sm: '120px', md: '150px' } }}>
                    <SidePanel ListStyles={{ ml: { xs: '1px', sm: "3px", md: "5px" }, }} ListItemStyles={{ fontWeight: "bold", mt: "5px" }} ListButtonStyles={{ margin: "8px" }} pageOn={"Home"} />
                  </Box>
                </>
              }
            </Grid>
          }

          <Grid item xs={12} sm={12} md={12} lg={10} sx={{ backgroundColor: "#ffffff", maxWidth: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", mx: "auto" }}>
            <Typography variant={lg ? "h4" : md ? "h5" : "h6"} noWrap sx={{ lineHeight: '1.25', textAlign: 'left', ml: lg ? 10 : "30px", mt: 5, }}>
              <span style={{ color: '#E57373', fontWeight: 'bold' }}>NEW</span><br />
              <span style={{ display: 'block' }}>
                <span style={{ color: '#58a75b', fontSize: "20px" }}>in </span>
                <span style={{ color: '#58a75b' }}>Store</span>
              </span>
            </Typography>
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
