import React, { useState } from 'react';
import { SwipeableDrawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidePanel from './sidePanel.jsx';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme.js';
import BackHanger from './backHanger.jsx';

function MyDrawer({pageOn}) {
  const [isOpen, setIsOpen] = useState(false);
  const lg = useMediaQuery(theme.breakpoints.up('md'));
  const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));


  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };
  
  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: lg ? 240 : md ? 200 : 180 }}
    >
      <BackHanger />
      <SidePanel ListStyles={{ ml: { xs: '3px', sm: "5px", md: "10px" } }} ListItemStyles={{ fontWeight: "bold", mt: "5px" }} ListButtonStyles={{ margin: "15px" }} pageOn={pageOn} />
    </div>
  );

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

export default MyDrawer;
