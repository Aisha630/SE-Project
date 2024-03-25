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
    
    const [checkedSubcategories, setCheckedSubcategories] = useState([]);

    const handleSubcategoryChange = (subcategory) => {
        const isChecked = checkedSubcategories.includes(subcategory);
        if (isChecked) {
            setCheckedSubcategories(checkedSubcategories.filter((item) => item !== subcategory));
        } else {
            setCheckedSubcategories([...checkedSubcategories, subcategory]);
        }
        console.log("SHOP: checked subcategories: ", checkedSubcategories);
    }

    const [checkedSizes, setCheckedSizes] = useState([]);
    const handleSizeChange = (size) => {
        const isChecked = checkedSizes.includes(size);
        if (isChecked) {
            setCheckedSizes(checkedSizes.filter((item) => item !== size));
        } else {
            setCheckedSizes([...checkedSizes, size]);
        }
        console.log("SHOP: checked sizes: ", checkedSizes);
    }

    const handleApplyFilters = () => {
        console.log("In handleApplyFilters")
        console.log('Checked subcategories:', checkedSubcategories);

        let filterCriteria = {
            category: category,
        }
        if (checkedSubcategories.length > 0) {
            filterCriteria = {...filterCriteria, tags: checkedSubcategories};
        }
        if (checkedSizes.length > 0) {
            filterCriteria = {...filterCriteria, sizes: checkedSizes};
        }
        
        const queryString = new URLSearchParams(filterCriteria);
        fetch(`http://localhost:5003/filter?${queryString}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
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
            console.log("pinged the filter api",data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
        handleDrawerClose();
    };

    const handleResetFilters = () => {
        console.log("In handleResetFilters")
        setCheckedSubcategories([]);
        setCheckedSizes([]);

        const queryString = new URLSearchParams({category: category});
        fetch(`http://localhost:5003/filter?${queryString}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
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
            console.log("pinged the filter api",data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
        handleDrawerClose();

    };

    useEffect(() => {
        const queryString = new URLSearchParams({category: category});
        fetch(`http://localhost:5003/filter?${queryString}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                const formattedProducts = data.map(product => ({
                    name: product.name,
                    image: 'http://localhost:5003'.concat(product.images[0]), // Assuming the first image in the array is the main image
                    price: product.price,
                    id: product._id
                }));
                setCheckedSubcategories([]);
                setCheckedSizes([]);
                setProducts(formattedProducts);
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
            <MainCategoryToolbar setCategory={setCategory} />

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
                <FilterMenu category={category} closeFilterMenu={handleDrawerClose} checkedSubcategories={checkedSubcategories} handleSubcategoryChange={handleSubcategoryChange} checkedSizes={checkedSizes} handleSizeChange={handleSizeChange} handleApplyFilters={handleApplyFilters} handleResetFilters={handleResetFilters}/>
            </Drawer>

            <Box sx={{ padding: '30px' }}>
                <ProductList products={products} />
            </Box>
        </ThemeProvider>
    )
}

export default ShopItems