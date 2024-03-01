// import React from 'react';
// import { Box, List, ListItemButton, ListItemIcon, ListItemText, Drawer, Card, CardMedia, CardContent, Grid, ThemeProvider, Typography } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import ShopIcon from '@mui/icons-material/Shop';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.js';
// import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import Info from "@mui/icons-material/Info";
// import AttachMoney from "@mui/icons-material/AttachMoney";

// import { Draw } from '@mui/icons-material';
// import Drawer from '../components/drawer.js';
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home'; // Import other icons as needed
// import ShopIcon from '@mui/icons-material/Shop';

import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, Typography, Grid, ThemeProvider, CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import theme from '../themes/homeTheme.js';
import CarouselComponent from '../components/carousel.js';
import ImageCard from '../components/card.js';


// Define list items in an array

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1
// };
const menuItems = [
  { text: 'Home', Icon: HomeIcon },
  { text: 'Shop', Icon: ShopIcon },
  { text: 'Donations', Icon: VolunteerActivismIcon },
  { text: 'Auction', Icon: AttachMoneyIcon },
  { text: 'About', Icon: InfoIcon },
];

const ListItemLink = ({ text, Icon }) => {
  const commonStyles = {
    minWidth: { xs: '30px', sm: '40px', md: '50px' },
    fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
  };

  return (
    <ListItemButton sx={{ '& .MuiListItemIcon-root, & .MuiTypography-root': commonStyles }}>
      <ListItemIcon><Icon /></ListItemIcon>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", mt: "5px", ...commonStyles }}>
        {text}
      </Typography>
    </ListItemButton>
  );
};

function Home() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Box>
        <Nav />
      </Box>
      <Grid container spacing={2} sx={{ padding: 1, }}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{ backgroundColor: "#e0e0e0" }}>
          <Box sx={{ width: "90%", minWidth: { xs: '150px', sm: '180px', md: '200px' } }}>
            <List sx={{ ml: { xs: '3px', sm: "5px", md: "10px" } }}>
              {menuItems.map(({ text, Icon }) => (
                <ListItemLink key={text} text={text} Icon={Icon} />
              ))}
            </List>
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
