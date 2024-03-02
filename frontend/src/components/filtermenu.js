import React, {useState} from 'react'
import { Grid, Box } from '@mui/material'
import CategoryFilter from './categoryfilter.js';
import PriceRangeSlider from './pricerangeslider.js';
import SortBy from './sortby.js';
import SizesCategories from './sizes.js';

const FilterMenu = () => {

    const [value, setValue] = useState([2000, 6000]);    
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
    };

    const handleApplyFilters = () => {
        // i think here i will just call the backend api with the filters??
        console.log('Price range:', value);
        console.log('Sort by:', sortBy);
        console.log('Category:', category);
        console.log('Sizes:', sizes);

    };


    return (
        <Box>
            <Grid container spacing={10} justifyItems={'flex-start'} padding={'20px'}>
                
                <Grid item xs={12} sm={3} justifyItems={'flex-start'}> {/* This is the first column with price range and sort by */}
                    <Grid container spacing={2} alignItems={'flex-start'} direction={'column'}>
                        <Grid item xs={12} sm={3}> {/* Price range*/}
                            <PriceRangeSlider value={value} handleChange={handlePriceSlider} />
                        </Grid>
                        <Grid item xs={12} sm={3} alignItems={'flex-start'}>  {/* sort by */}
                            <SortBy sortBy={sortBy} handleSortBy={handleSortBy} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={3}> {/*Categories*/}
                    <CategoryFilter state={category} handleChange={handleCategory} />
                </Grid>
                <Grid item xs={12} sm={3}> {/* sizes */}
                    <SizesCategories state={sizes} handleChange={handleSizes} />
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" alignItems={'bottom'} padding={'20px'}>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={2} justifyContent="flex-end" alignItems={'bottom'}>
                        <Grid item>
                            <button variant="outlined" onClick={handleResetFilters}>Reset Filters</button>
                        </Grid>
                        <Grid item>
                            <button variant="outlined" onClick={handleApplyFilters}>Apply Filters</button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </Box>
        
        
    );
};

export default FilterMenu