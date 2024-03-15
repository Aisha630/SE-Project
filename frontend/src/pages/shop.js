import React, { useEffect, useState } from 'react'
import { Drawer, Typography, Box, ListItemButton, ListItemIcon, ThemeProvider } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import NavBar from '../components/navbarshop.js';
import theme from '../themes/homeTheme.js';
import ProductList from '../components/productlisting.js';
import TuneIcon from '@mui/icons-material/Tune';
import FilterMenu from '../components/filtermenu.js';
import MainCategoryToolbar from '../components/maincategoriestoolbar.js';
import { useNavigate } from 'react-router-dom';

// import Product from '../components/product.js';


const ShopItems = () => {

    const stored_Session = localStorage.getItem('persist:root');
    const session = JSON.parse(stored_Session);
    const token = JSON.parse(session.auth).token;
    const navigate = useNavigate();


    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        fetch('http://localhost:5003/shop', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const formattedProducts = data.map(product => ({
                name: product.name,
                image: 'http://localhost:5003'.concat(product.images[0]), // Assuming the first image in the array is the main image
                price: product.price
            }));
            setProducts(formattedProducts);
            // console.log(formattedProducts);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [token, navigate]);


    const ListItemLink = ({ text, Icon, to }) => {
        const commonStyles = {
            minWidth: { xs: '30px', sm: '40px', md: '50px' },
            fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
        };

        return (
            <ListItemButton component={RouterLink} to={to} onClick={toggleFilterMenu} sx={{
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

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    const toggleFilterMenu = () => {
        setIsFilterMenuOpen(!isFilterMenuOpen);
    };

    const handleDrawerClose = () => {
        setIsFilterMenuOpen(false);
    };

    

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <NavBar />
            </Box>

            
            <MainCategoryToolbar />

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

            <Drawer
                anchor='top'
                open={isFilterMenuOpen}
                onClose={handleDrawerClose}
                style={{ opacity: 0.95 }}
            >
                <FilterMenu closeFilterMenu={handleDrawerClose} />
            </Drawer>

            <Box sx={{ padding: '30px' }}>
                <ProductList products={products} />
            </Box>
        </ThemeProvider>
    )
}

export default ShopItems