import React, { useEffect, useState } from 'react'
import { Drawer,  Box, ThemeProvider } from '@mui/material'
// import NavBar from '../components/navbarshop.jsx';
import Nav from '../components/nav.jsx';
import theme from '../themes/homeTheme.js';
import ProductList from '../components/productlisting.jsx';
import TuneIcon from '@mui/icons-material/Tune';
import FilterMenu from '../components/filtermenu.jsx';
import MainCategoryToolbar from '../components/maincategoriestoolbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItemLink from '../components/ListItemLink.jsx';
import NoProducts from '../components/noProducts.jsx';
import Search from '../components/search.jsx';
import MyDrawer from '../components/drawer.jsx';


const ShopItems = ({mode}) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const [category, setCategory] = useState('Clothing')
    const [products, setProducts] = useState([]);

    const [isEmpty, setIsEmpty] = useState(false);
    
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
            productType : mode,
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
            setIsEmpty(formattedProducts.length === 0);

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

        const queryString = new URLSearchParams({category: category, productType: mode});
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
            setIsEmpty(formattedProducts.length === 0);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        handleDrawerClose();

    };

    useEffect(() => {
        const queryString = new URLSearchParams({category: category, productType: mode});
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
                    id: product._id,
                    currentBid : product.currentBid,
                    endTime : product.endTime
                }));
                setCheckedSubcategories([]);
                setCheckedSizes([]);
                console.log(data)
                setProducts(formattedProducts);

                setIsEmpty(formattedProducts.length === 0);
            })
            .catch(error => {
                console.error('Error:', error);
                navigate('/login');
            });
    }, [token, navigate, category]);
    
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    const toggleFilterMenu = () => {
        setIsFilterMenuOpen(!isFilterMenuOpen);
    };

    const handleDrawerClose = () => {
        setIsFilterMenuOpen(false);
    };

    let pageOn = "Shop";
    if (mode === "auction") {
        pageOn = "Auction";
    }
    else if (mode === "donate") {
        pageOn = "Donations";
    }

    console.log("SHOP: products: ", products);
    
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Nav Drawer={MyDrawer} Search={Search} pageOn={pageOn} setIsEmpty={setIsEmpty} setSearchProducts={setProducts}/>
            </Box>
            <MainCategoryToolbar setCategory={setCategory} category={category} /> {/*This is the main toolbar that represents clothing, technology, and miscellaneous categories*/}

            {/* This box followed by a drawer represents the filters menu. The box contains the clickable button that opens and closes the filters menu drawer */}
            <Box display="flex" justifyContent="left" mt={2} ml={2} sx={{ width: "15%", fontWeight: "normal", }} >
                <ListItemLink text={"Filter and Order"} Icon={TuneIcon} to={"#"} onClick={toggleFilterMenu} ButtonStyles={{
                    '&:hover': {
                        backgroundColor: "transparent",
                        textDecoration: 'underline',
                        textDecorationColor: '#58a75b',
                        '& .MuiListItemIcon-root, & .MuiTypography-root': {
                            color: "#58a75b",
                        }
                    },
                }}/>
            </Box>
            <Drawer
                anchor='top'
                open={isFilterMenuOpen}
                onClose={handleDrawerClose}
                style={{ opacity: 0.95 }}
            >
                <FilterMenu category={category} closeFilterMenu={handleDrawerClose} checkedSubcategories={checkedSubcategories} handleSubcategoryChange={handleSubcategoryChange} checkedSizes={checkedSizes} handleSizeChange={handleSizeChange} handleApplyFilters={handleApplyFilters} handleResetFilters={handleResetFilters}/>
            </Drawer>

            {/* This section represents the actual products */}
            <Box sx={{ padding: '30px' }}>
                {isEmpty && <NoProducts />}
                {!isEmpty && <ProductList products={products} mode={mode}/>}
                
            </Box>
        </ThemeProvider>
    )
}

export default ShopItems