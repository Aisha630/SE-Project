import React from 'react'
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material'


const SizesCategories = ({state, handleChange}) => {
    
    return (
        <FormControl sx={{color:'inherit'}}>
            <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{color:'inherit'}}>
                Sizes
            </Typography>
            <FormGroup sx={{color: 'inherit', paddingTop:'10px'}}>
            <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="XS" />
            <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="S"  />
            <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="M" />
            <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="L" />
            <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="XL" />
            </FormGroup>
            
        </FormControl>
    
      );
}

export default SizesCategories