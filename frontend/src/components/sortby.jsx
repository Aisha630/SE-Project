import { FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material'
import React from 'react'

const SortBy = ({sortBy, handleSortBy}) => {
    return (
        <FormControl sx={{color:'inherit', paddingTop:'20px'}}>
            <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{color:'inherit'}}>
                Sort by
            </Typography>
            <RadioGroup
                aria-labelledby="sort by options"
                defaultValue="new2used"
                name="sortbyoptions"
            >
                <FormControlLabel 
                value="new2used" 
                control={<Radio sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
                label="Most Recent" 
                />
                <FormControlLabel 
                value="low2high" 
                control={<Radio sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
                label="Lowest Price" 
                />
                <FormControlLabel 
                value="high2low" 
                control={<Radio sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
                label="Highest Price" />
            </RadioGroup>
        </FormControl>
    )
}

export default SortBy