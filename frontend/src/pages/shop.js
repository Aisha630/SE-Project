import React from 'react'
import { Typography, Box, ListItemButton, ListItemIcon, ThemeProvider } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
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

    // function n() {
    //     alert("This feature is yet to be implemented");
    // }


    const ListItemLink = ({ text, Icon, to }) => {
        const commonStyles = {
            minWidth: { xs: '30px', sm: '40px', md: '50px' },
            fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
        };

        return (
            <ListItemButton component={RouterLink} to={to} sx={{
                '& .MuiListItemIcon-root, & .MuiTypography-root': commonStyles, '&:hover': {
                    backgroundColor: "transparent",
                    textDecoration: 'underline',
                    textDecorationColor: '#58a75b',
                    '& .MuiListItemIcon-root, & .MuiTypography-root': {
                        color: "#58a75b",
                    }
                },
            }}>
                <ListItemIcon sx={{ mr: 0, padding: 0 }}><Icon /></ListItemIcon>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "normal", mt: "5px", ml: 0, ...commonStyles, }}>
                    {text}
                </Typography>
            </ListItemButton>
        );
    };


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <NavBar />
            </Box>
            <Box display="flex" justifyContent="left" mt={2} ml={2} sx={{ width: "15%", fontWeight: "normal", }} >
                <ListItemLink text={"Filter and Order"} Icon={TuneIcon} to={"#"} sx={{
                    '&:hover': {
                        backgroundColor: "#e0e0e0",
                        '& .MuiListItemIcon-root, & .MuiTypography-root': {
                            color: "#ffffff",
                        }
                    },
                }} />
            </Box>

            <Box sx={{ padding: '30px' }}>
                <ProductList products={products} />
            </Box>
        </ThemeProvider>
    )
}

export default ShopItems