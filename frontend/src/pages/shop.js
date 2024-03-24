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
import { useSelector } from 'react-redux';

const ShopItems = () => {

    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const [category, setCategory] = useState('Clothing')
    const [products, setProducts] = useState([]);
  
    const filterCriteria = {
        category: category,
    };
    
    useEffect(() => {
        fetch('http://localhost:5003/filter', {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(filterCriteria)
        })
            .then(response => response.json())
            .then(data => {
                const formattedProducts = data.map(product => ({
                    name: product.name,
                    image: 'http://localhost:5003'.concat(product.images[0]), // Assuming the first image in the array is the main image
                    price: product.price,
                    id: product._id
                }));
                setProducts(formattedProducts);
                console.log("Clothing related: ",formattedProducts)
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
                navigate('/login');
            });
    }, [token, navigate, category]);


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
            <MainCategoryToolbar setCategory={setCategory}/>

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
                <FilterMenu closeFilterMenu={handleDrawerClose} setProducts={setProducts} maincategory={category}/>
            </Drawer>

            <Box sx={{ padding: '30px' }}>
                <ProductList products={products} />
            </Box>
        </ThemeProvider>
    )
}

export default ShopItems