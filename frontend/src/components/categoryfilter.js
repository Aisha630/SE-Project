import React from 'react'
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

const CategoryFilter = ({state, handleChange}) => {    

  
  return (
    <FormControl sx={{color:'inherit'}}>
        <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{color:'inherit'}}>
            Categories
        </Typography>
        <FormGroup sx={{color: 'inherit', paddingTop:'10px'}}>
        <FormControlLabel control={<Checkbox onClick={handleChange} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="Eastern" />
        <FormControlLabel control={<Checkbox onClick={handleChange} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="Dresses"  />
        <FormControlLabel control={<Checkbox onClick={handleChange} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="Shoes" />
        <FormControlLabel control={<Checkbox onClick={handleChange} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="Jeans" />
        <FormControlLabel control={<Checkbox onClick={handleChange} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="Bags" />
        <FormControlLabel control={<Checkbox onClick={handleChange} sx={{ '&.Mui-checked': { color: '#58a75b' } }} />} label="Accessories" />
        </FormGroup>
        
    </FormControl>

  )
}
// #58a75b

export default CategoryFilter