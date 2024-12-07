import { FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material'
import React from 'react'

const ConditionFilter = ({condition, handleCondition}) => {
    return (
        <FormControl sx={{color:'inherit', paddingTop:'20px', paddingLeft:2}}>
            <Typography variant="subtitle1" gutterBottom textAlign={'left'} sx={{color:'inherit'}}>
                Condition
            </Typography>
            <RadioGroup
                aria-labelledby="condition options"
                name="conditionoptions"
                value={condition}
                onChange={handleCondition}
            >
                <FormControlLabel 
                value="new" 
                control={<Radio sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
                label="New" 
                />
                <FormControlLabel 
                value="old" 
                control={<Radio sx={{ '&.Mui-checked': { color: '#58a75b' } }} />}
                label="Used" />
            </RadioGroup>
        </FormControl>
    )
}

export default ConditionFilter 