import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; 

const MainCategoryToolbar = ({ setCategory, category }) => {
    const navItems = ['Clothing', 'Technology', 'Miscellaneous'];
    const [hover, setHover] = useState(false);

    const handleNavigation = (direction) => {
        const currentIndex = navItems.indexOf(category);
        const nextIndex = (currentIndex + direction + navItems.length) % navItems.length;
        setCategory(navItems[nextIndex]);
    };

    return (
        <AppBar 
            component={'nav'}
            position="static"
            color="default"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'center',
                    paddingTop: '4rem'
                }}
            >
                <Box
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    {hover && (
                        <IconButton onClick={() => handleNavigation(-1)} sx={{ color: '#58a75b', visibility: hover ? 'visible' : 'hidden' }}>
                            <ArrowBackIosIcon fontSize="small" />
                        </IconButton>
                    )}
                    <Typography variant="h6" sx={{ color: '#58a75b', mx: 2, transition: 'color 0.3s ease' }}>
                        {category}
                    </Typography>
                    {hover && (
                        <IconButton onClick={() => handleNavigation(1)} sx={{ color: '#58a75b', visibility: hover ? 'visible' : 'hidden' }}>
                            <ArrowForwardIosIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MainCategoryToolbar;
