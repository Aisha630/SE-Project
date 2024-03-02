import React, { useState } from 'react';
import { SwipeableDrawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidePanel from './sidePanel.js';

function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handleBack = () => {
    setIsOpen(false);
  }

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
      <SidePanel ListStyles={{ ml: { xs: '3px', sm: "5px", md: "10px" } }} ListItemStyles={{ fontWeight: "bold", mt: "5px" }} ListButtonStyles={{margin:"15px"}} />
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

export default Drawer;
