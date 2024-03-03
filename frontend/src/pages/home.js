import React from 'react';
import { Box, Typography, Grid, ThemeProvider } from '@mui/material';
import CarouselComponent from '../components/carousel.js';
import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.js';
import SidePanel from '../components/sidePanel.js';

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Nav Drawer={Box} Search={Box}/>
      </Box>
      <Grid container spacing={1} sx={{ padding: 1, }}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{ backgroundColor: "#e0e0e0",  }}>
          <Box sx={{ width: "90%", mr: { xs: '3px', sm: "5px", md: "10px" }, minWidth: { xs: '150px', sm: '180px', md: '200px' } }}>
            <SidePanel ListStyles={{ ml: { xs: '3px', sm: "5px", md: "10px" }, }} ListItemStyles={{fontWeight: "bold", mt: "5px"}} ListButtonStyles={{margin: "5px" }} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9} lg={10} sx={{ backgroundColor: "ffffff" }}>
          <Typography variant="h4" noWrap sx={{ lineHeight: '1.25', textAlign: 'left', ml: "30px", mt: "20px" }}>
            <span style={{ color: '#E57373', fontWeight: 'bold' }}>NEW</span><br />
            <span style={{ display: 'block' }}>
              <span style={{ color: '#58a75b', fontSize: "20px" }}>in </span>
              <span style={{ color: '#58a75b' }}>Clothing</span>
            </span>
          </Typography>
          <Box sx={{ width: "95%", minWidth: { xs: '150px', sm: '180px', md: '200px', }, ml: "30px" }}>
            <CarouselComponent />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}

export default Home;
