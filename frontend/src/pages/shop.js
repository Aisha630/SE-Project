import React from 'react'
import { AppBar, Toolbar, Button, IconButton, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Card, CardMedia, CardContent, Grid, ThemeProvider, Link } from '@mui/material'
// import { useSelector } from 'react-redux'
// import { useLogout } from '../hooks/useLogout'
import NavBar from '../components/navbarshop.js';
import theme from '../themes/homeTheme.js';
import ProductList from '../components/productlisting.js';
import TuneIcon from '@mui/icons-material/Tune';

const ShopItems = () => {
    const products = [
        { name: 'Plain black sweatshirt', image: '/img1.png', price: 900 },
        { name: 'Silk pleated midi skirt', image: '/img2.png', price: 2100 },
        { name: 'Regular cotton blend t-shirt', image: '/img3.png', price: 2400 },
        { name: 'Halter top with slit detail', image: '/img4.png', price: 1200 },
        { name: 'Product 5', image: 'https://via.placeholder.com/300', price: 500 },
        { name: 'Product 6', image: 'https://via.placeholder.com/300', price: 600 },
        { name: 'Product 7', image: 'https://via.placeholder.com/300', price: 700 },
        { name: 'Product 8', image: 'https://via.placeholder.com/300', price: 800 },
        { name: 'Product 9', image: 'https://via.placeholder.com/300', price: 800 },
        { name: 'Product 10', image: 'https://via.placeholder.com/300', price: 800 },
        { name: 'Product 11', image: 'https://via.placeholder.com/300', price: 800 },
        { name: 'Product 12', image: 'https://via.placeholder.com/300', price: 800 },
    ]

    function n() {
        alert("This feature is yet to be implemented");
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <NavBar />
            </Box>
            {/* This is the filter and Sort clickable popup */}
            <Box display="flex" justifyContent="left" mt={2} ml={2} >
                <ListItem >
                    <ListItemIcon>
                        <TuneIcon /> 
                        <Link href="#" underline="hover" onClick={n} color='grey' sx={{fontSize:'1.5rem', ml:1}}>
                            <ListItemText primary="Filter and Order" />
                        </Link>
                    </ListItemIcon>
                </ListItem>
            </Box>

            <Box sx={{padding:'30px'}}>
                <ProductList products={products} />
            </Box>
        </ThemeProvider>
    )
}

export default ShopItems