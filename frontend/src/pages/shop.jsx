import React, { useEffect, useState } from 'react'
import { Drawer,  Box, ThemeProvider } from '@mui/material'
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
import TagList from '../components/tagList';
import config from "../../config_display.json";

const ShopItems = ({mode}) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const [category, setCategory] = useState('Clothing')
    const [products, setProducts] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [price, setPrice] = useState([0, 15000]);
    const [checkedSizes, setCheckedSizes] = useState([]);
    const [sortBy, setSortBy] = useState('unset');
    const [condition, setCondition] = useState('unset');
    const [selectedTag, setSelectedTag] = useState('All');
    const [checkedColors, setCheckedColors] = useState([]);

    const getTagsList = () => ['All', ...config.categories[category]]
    const handleSelectedTag = (tag) => {
        setSelectedTag(tag);
    }

    const handleColorChange = (color) => {
        const isChecked = checkedColors.includes(color);
        if (isChecked) {
            setCheckedColors(checkedColors.filter((item) => item !== color));
        } else {
            setCheckedColors([...checkedColors, color]);
        }
    }

    const handleSizeChange = (size) => {
        const isChecked = checkedSizes.includes(size);
        if (isChecked) {
            setCheckedSizes(checkedSizes.filter((item) => item !== size));
        } else {
            setCheckedSizes([...checkedSizes, size]);
        }
    }

    const handleSortBy = (event) => {
        setSortBy(event.target.value);
    }

    const handleCondition = (event) => {
        setCondition(event.target.value);
    }

    const handleApplyFilters = () => {
        let filterCriteria = {
            productType : mode,
            category: category,
        }
        if (selectedTag !== 'All') {
            filterCriteria = {...filterCriteria, tags: selectedTag};
        }
        if (checkedSizes.length > 0) {
            filterCriteria = {...filterCriteria, sizes: checkedSizes};
        }
        if (price[0] > 0) {
            filterCriteria = {...filterCriteria, minPrice: price[0]};   
        }
        if (price[1] < 15000) {
            filterCriteria = {...filterCriteria, maxPrice: price[1]};
        }
        if (sortBy !== 'unset') {
            filterCriteria = {...filterCriteria, sortBy: sortBy};
        }
        if (condition !== 'unset') {
            filterCriteria = {...filterCriteria, condition: condition};
        }
        
        if (checkedColors.length>0){
            filterCriteria = {...filterCriteria, colors: checkedColors}
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
                id: product._id,
                currentBid : product.currentBid ? product.currentBid : 0,
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
        setCheckedSizes([]);
        setPrice([0, 15000]);
        setSortBy('unset');
        setCondition('unset');
        setCheckedColors([]);
        setSelectedTag('All');

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
                id: product._id,
                currentBid : product.currentBid ? product.currentBid : 0,
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
                setCheckedSizes([]);
                setPrice([0, 15000]);
                setSortBy('unset');
                setCondition('unset');
                setProducts(formattedProducts);
                setCheckedColors([]);
                setIsEmpty(formattedProducts.length === 0);
                setSelectedTag('All');
            })
            .catch(error => {
                console.error('Error:', error);
                navigate('/login');
            });
    }, [token, navigate, category]);

    useEffect(() => {
        handleApplyFilters();
      }, [token, selectedTag, category, mode]);
    
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    const toggleFilterMenu = () => {
        setIsFilterMenuOpen(!isFilterMenuOpen);
    };

    const handleDrawerClose = () => {
        setIsFilterMenuOpen(false);
    };

    const handleSetProducts = (products) => {
        setProducts(products);
    }

    const handlePriceSlider = (event, newValue) => {
        setPrice(newValue);
    };

    let pageon = "Shop";
    if (mode === "auction") {
        pageon = "Auction";
    }
    else if (mode === "donate") {
        pageon = "Donations";
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Nav Search={Search} setisempty={setIsEmpty} setsearchproducts={handleSetProducts} mode={mode} category={category}/>
            </Box>
            <MainCategoryToolbar setCategory={setCategory} category={category} /> {/*This is the main toolbar that represents clothing, technology, and miscellaneous categories*/}
            <TagList
                tags={getTagsList()}
                selectedTag={selectedTag}
                onTagSelected={handleSelectedTag}
            />
            <Box display="flex" justifyContent="left" mt={2} ml={2} sx={{ width: "15%", fontWeight: "normal", }} >
                <ListItemLink text={""} Icon={TuneIcon} to={"#"} onClick={toggleFilterMenu} ButtonStyles={{
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
                <FilterMenu mode={mode} category={category} closeFilterMenu={handleDrawerClose} checkedSizes={checkedSizes} handleSizeChange={handleSizeChange} handleApplyFilters={handleApplyFilters} handleResetFilters={handleResetFilters} price={price} setPrice={handlePriceSlider} sortBy={sortBy} setSortBy={handleSortBy} condition={condition} setCondition={handleCondition} checkedColors={checkedColors} handleColorChange={handleColorChange} />
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