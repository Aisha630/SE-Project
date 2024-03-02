import React, { useState } from 'react';
import { SwipeableDrawer, List, ListItemButton, IconButton, ListItemIcon, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';


function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handleBack = () => {
    setIsOpen(false);
  }

  const menuItems = [
    { text: 'Home', Icon: HomeIcon },
    { text: 'Shop', Icon: ShopIcon },
    { text: 'Donations', Icon: VolunteerActivismIcon },
    { text: 'Auction', Icon: AttachMoneyIcon },
    { text: 'About', Icon: InfoIcon },
  ];
  const commonStyles = {
    minWidth: { xs: '30px', sm: '40px', md: '50px' },
    fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 250 }}
    >
      <IconButton onClick={handleBack} sx={{ margin: "10px" }}>
        <img src="backIcon.png" alt="Custom Icon" style={{ width: 65, height: 50 }} />
      </IconButton>
      <List sx={{ ml: { xs: '3px', sm: "5px", md: "10px" } }}>
        {menuItems.map(({ text, Icon }) => (
          <ListItemButton key={text} onClick={() => handleMenuItemClick(text)} sx={{ margin: "15px" }} >
            <ListItemIcon><Icon /></ListItemIcon>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", mt: "5px", ...commonStyles }}>
              {text}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  const handleMenuItemClick = (text) => {
    if (text === 'Home') {
      navigate("/");
    } else {
      navigate("/" + text.toLowerCase());
    }
  }

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="open drawer" edge="start">
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={'left'}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        style={{ opacity: 0.9 }}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}


export default Drawer;
