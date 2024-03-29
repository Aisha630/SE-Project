import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

const ConditionSelection = ({ adData, handleInputChange, errors }) => (
  <FormControl component="fieldset" margin="normal">
    <FormLabel component="legend">Condition</FormLabel>
    <RadioGroup
      row
      name="condition"
      value={adData.condition}
      onChange={handleInputChange}
    >
      <FormControlLabel value="new" control={<Radio />} label="New" />
      <FormControlLabel value="old" control={<Radio />} label="Used" />
    </RadioGroup>
    {errors.condition && (
      <Typography color="error" variant="caption">
        {errors.condition}
      </Typography>
    )}
  </FormControl>
);

export default ConditionSelection;