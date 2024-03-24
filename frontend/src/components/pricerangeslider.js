import React from 'react'
import { Box, Slider, Typography } from '@mui/material'

const PriceRangeSlider = ({value, handleChange, valuetext}) => {
    
    const [minValue, maxValue] = value;
    

  return (
    <Box sx={{color:'inherit', paddingLeft:'20px'}}>
        <Typography id="range-slider" gutterBottom textAlign={'left'}>
            Price range
        </Typography>
        <Slider
            value={value}
            onChange={handleChange}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            size='small'
            width="100%"
            step={10}
            min={0}
            max={10000}
            sx={{color:'inherit'}}
            valueLabelDisplay="off"
        />
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant="subtitle1" gutterBottom>
                PKR {minValue}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                PKR {maxValue}
            </Typography>
        </Box>
    </Box>
  )
}

export default PriceRangeSlider