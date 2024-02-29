import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { useSelector } from 'react-redux';


import { useLogout } from '../hooks/useLogout';

const Landing = () => {
    const user = useSelector((state) => state.auth.user);
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
    
    return (
        <Box sx={{ display: 'flex' }}>
            {/* AppBar goes here */}
            <AppBar position="static">
                {/* ... */}
            </AppBar>

            {/* Sidebar goes here */}
            <Box>
                {/* ... */}
            </Box>

            {/* Main Content goes here */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2}>
                    {/* Cards go here */}
                </Grid>
            </Box>
        </Box>
    );
  );
};

export default Landing;

