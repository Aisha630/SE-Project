import React, {useState} from 'react'
import { Grid, Typography, Box, ListItemButton, ListItemIcon } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import CategoryFilter from './categoryfilter.js';
import PriceRangeSlider from './pricerangeslider.js';
import SortBy from './sortby.js';
import SizesCategories from './sizes.js';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const FilterMenu = ({closeFilterMenu, setProducts, maincategory}) => {
    
    const token = useSelector((state) => state.auth.token);


    const [value, setValue] = useState([0, 200000]);    
    const handlePriceSlider = (event, newValue) => {
        setValue(newValue);
    };
    
    const [sortBy, setSortBy] = useState('new2used');
    const handleSortBy = (event) => {
        setSortBy(event.target.value);
    };

    const [category, setCategory] = useState(null);
    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const [sizes, setSizes] = useState([]);
    const handleSizes = (event) => {
        setSizes(event.target.value);
    }

    const handleResetFilters = () => {
        setValue([2000, 6000]);
        setSortBy('new2used');
        setCategory(null);
        setSizes([]);

        closeFilterMenu();
    };
    

    const handleApplyFilters = () => {
        // i think here i will just call the backend api with the filters??
        console.log('Price range:', value);
        console.log('Sort by:', sortBy);
        console.log('Category:', category);
        console.log('Sizes:', sizes);
        // setProducts([]);

        // const filterCriteria = {

        // }

        // fetch('http://localhost:5003/filter', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body : JSON.stringify(filterCriteria)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     const formattedProducts = data.map(product => ({
        //         name: product.name,
        //         image: 'http://localhost:5003'.concat(product.images[0]), // Assuming the first image in the array is the main image
        //         price: product.price,
        //         id: product._id
        //     }));
        //     setProducts(formattedProducts);
        //     console.log("pinged the filter api",data)

        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
        

        closeFilterMenu();
    };

    const ListItemLink = ({ text, Icon, to }) => {
        const commonStyles = {
            minWidth: { xs: '30px', sm: '40px', md: '50px' },
            fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
        };

        return (
            <ListItemButton component={RouterLink} to={to} onClick={closeFilterMenu} sx={{
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
        <Box sx={{backgroundColor:'#e0e0e0'}}>
            <Grid container justifyContent="flex-start" alignItems={'top'}> 
            </Grid>
                <Grid item>
                    {/* <CloseIcon onClick={closeFilterMenu} /> */}
                    <Box display="flex" justifyContent="left" mt={2} ml={2} sx={{ width: "15%", fontWeight: "normal", }} >
                    <ListItemLink text={""} Icon={CloseIcon} to={"#"} sx={{
                        '&:hover': {
                            backgroundColor: "#e0e0e0",
                            '& .MuiListItemIcon-root, & .MuiTypography-root': {
                                color: "#ffffff",
                            }
                        },
                    }} />
                    </Box>
                </Grid>
            <Grid container spacing={10} justifyItems={'flex-start'} padding={'20px'}>
                <Grid item xs={12} sm={3}> {/* This is the first column with price range and sort by */}
                    <Grid container spacing={2} direction={'column'}>
                        <Grid item xs={12} sm={3}> {/* Price range*/}
                            <PriceRangeSlider value={value} handleChange={handlePriceSlider} />
                        </Grid>
                        <Grid item xs={12} sm={3} alignItems={'flex-start'}>  {/* sort by */}
                            <SortBy sortBy={sortBy} handleSortBy={handleSortBy} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={3}> {/*Sub-categories*/}
                    <CategoryFilter state={category} handleChange={handleCategory} />
                </Grid>
                <Grid item xs={12} sm={3}> {/* sizes */}
                    <SizesCategories state={sizes} handleChange={handleSizes} />
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" alignItems={'bottom'} padding={'20px'} paddingRight={'40px'}>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={2} justifyContent="flex-end" alignItems={'bottom'}>
                        <Grid item>
                            <button variant="outlined" onClick={handleApplyFilters}>Apply Filters</button> 
                        </Grid>
                        <Grid item>
                            <button variant="outlined" onClick={handleResetFilters}>Reset Filters</button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </Box>
        
        
    );
};

export default FilterMenu