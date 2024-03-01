import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Card, CardMedia, CardContent, Grid, ThemeProvider } from '@mui/material'
// import { useSelector } from 'react-redux'
// import { useLogout } from '../hooks/useLogout'
import NavBar from '../components/navbarshop.js';
import theme from '../themes/homeTheme.js';

const ShopItems = () => {
  return (
    <ThemeProvider theme={theme}>
        <Box>
            <NavBar />
        </Box>
    </ThemeProvider>
  )
}

export default ShopItems