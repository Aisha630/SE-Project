import React from 'react'
import { Grid, Box } from '@mui/material'
import CategoryFilter from './categoryfilter.jsx';
import PriceRangeSlider from './pricerangeslider.jsx';
import SortBy from './sortby.jsx';
import SizesCategories from './sizes.jsx';
import CloseIcon from '@mui/icons-material/Close';
import SiteButton from './button.jsx';
import ListItemLink from './ListItemLink.jsx';
import ConditionFilter from './conditionfilter.jsx';
import ColorFilter from './colorFilters.jsx';

const FilterMenu = ({ mode, category, closeFilterMenu, checkedSizes, handleSizeChange, handleApplyFilters, handleResetFilters, price, setPrice, sortBy, setSortBy, condition, setCondition, checkedColors, handleColorChange }) => {
    return (
        <Box sx={{ backgroundColor: '#e0e0e0' }}>
            <Grid container justifyContent="flex-start" alignItems={'top'}>
            </Grid>
            <Grid item>
                {/* <CloseIcon */}
                <Box display="flex" justifyContent="left" mt={2} ml={2} sx={{ width: "15%", fontWeight: "normal", }} >
                    <ListItemLink text={""} Icon={CloseIcon} to={"#"} onClick={closeFilterMenu} ButtonStyles={{
                        '&:hover': {
                            backgroundColor: "transparent",
                            '& .MuiListItemIcon-root, & .MuiTypography-root': {
                                color: "#58a75b",
                            }
                        },
                    }} />
                </Box>
            </Grid>
            <Grid container spacing={10} justifyItems={'flex-start'} padding={'20px'}>
                <Grid item xs={12} sm={3} alignItems={'flex-start'}> {/* This is the first column with price range and sort by */}
                    <Grid container spacing={2} direction={'column'}>
                        {mode !== 'donate' && <Grid item xs={12} sm={3}> {/* Price range*/}
                            <PriceRangeSlider mode={mode} value={price} handleChange={setPrice} />
                        </Grid>}
                        {mode !== 'donate' &&
                            <Grid item xs={12} sm={3} alignItems={'flex-start'}>  {/* sort by */}
                                <SortBy sortBy={sortBy} handleSortBy={setSortBy} />
                            </Grid>

                        }
                        <Grid item xs={12} sm={3} alignItems={'flex-start'}>  {/* sort by */}
                            <ConditionFilter condition={condition} handleCondition={setCondition} />
                        </Grid>

                    </Grid>
                </Grid>

                {/* <Grid item xs={12} sm={3} alignItems={'flex-start'}> Sub-categories */}
                    {/* <CategoryFilter category={category} checkedSubcategories={checkedSubcategories} handleChange={handleSubcategoryChange} />
                </Grid> */}

                {category === 'Clothing' && 
                    <Grid item xs={12} sm={3} alignItems={'flex-start'}> {/*Colors*/}
                        <ColorFilter checkedColors={checkedColors} handleChange={handleColorChange} />
                    </Grid>
                }
                {category === 'Clothing' &&
                    <Grid item xs={12} sm={3} alignItems={'flex-start'} > {/* sizes */}
                        <SizesCategories checkedSizes={checkedSizes} handleSizeChange={handleSizeChange} />
                    </Grid>
                }
            </Grid> {/*This is the last box at the bottom for applying or resetting filters */}
            <Grid container spacing={2} justifyContent="flex-end" alignItems={'bottom'} padding={'20px'} paddingRight={'40px'}>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={2} justifyContent="flex-end" alignItems={'bottom'}>
                        <Grid item>
                            <SiteButton text={"Apply Filters"} styles={{ backgroundColor: "#58a75b", color: "white" }} onClick={handleApplyFilters} />
                        </Grid>
                        <Grid item>
                            <SiteButton text={"Reset Filters"} styles={{ backgroundColor: "#58a75b", color: "white" }} onClick={handleResetFilters} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box>


    );
};

export default FilterMenu