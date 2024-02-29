// import React from 'react';
// import { useSelector } from 'react-redux';


// import { useLogout } from '../hooks/useLogout';

// const Home = () => {
//   const user = useSelector((state) => state.auth.user);
//   const { logout } = useLogout();

//   const handleLogout = () => {
//     logout();
//   };

//   return (

//     <div>
//       <h1>Welcome, {user ? user : 'Guest'}!</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Card, CardMedia, CardContent, Grid, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
// ... other icons you might need
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import theme from '../themes/homeTheme.js';
import Nav from '../components/nav.js';


function Home() {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1
  // };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Nav />
        {/* <Box sx={{ width: '250px', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShopIcon />
            </ListItemIcon>
            <ListItemText primary="Shop" />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography gutterBottom variant="h5" component="div">
          NEW in Clothing
        </Typography>
        <Slider {...settings}>
          <div>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="sta_logo.png" 
                alt="Clothing item 1"
              />
            </Card>
          </div>
          <div>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="sta_logo.png" 
                alt="Clothing item 2"
              />
            </Card>
          </div>
        </Slider>
      </Box>*/}
      </Box>
    </ThemeProvider >
  );
}

export default Home






