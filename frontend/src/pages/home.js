import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, Typography, Grid, ThemeProvider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CarouselComponent from '../components/carousel.js';
import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.js';

const menuItems = [
  { text: 'Home', Icon: HomeIcon, to: '/' },
  { text: 'Shop', Icon: ShopIcon, to: '/shop' },
  { text: 'Donations', Icon: VolunteerActivismIcon, to: '/auction' },
  { text: 'Auction', Icon: AttachMoneyIcon, to: '/donation' },
  { text: 'About', Icon: InfoIcon, to: '/help' },
];

const ListItemLink = ({ text, Icon, to }) => {
  const commonStyles = {
    minWidth: { xs: '30px', sm: '40px', md: '50px' },
    fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
  };

  return (
    <ListItemButton component={RouterLink} to={to} sx={{ '& .MuiListItemIcon-root, & .MuiTypography-root': commonStyles }}>
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
      <Box>
        <Nav />
      </Box>
      <Grid container spacing={2} sx={{ padding: 1, }}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{ backgroundColor: "#e0e0e0" }}>
          <Box sx={{ width: "90%", minWidth: { xs: '150px', sm: '180px', md: '200px' } }}>
            <List sx={{ ml: { xs: '3px', sm: "5px", md: "10px" } }}>
              {menuItems.map(({ text, Icon, to }) => (
                <ListItemLink key={text} text={text} Icon={Icon} to={to} />
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
