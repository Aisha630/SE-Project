import { Button } from '@mui/material';
import React from 'react';

const SiteButton = ({ disabled, text, styles, onClick, align }) => {
    return (
        <Button disabled={disabled} align={align} variant="contained" onClick={onClick} sx={{
            ...styles, '&:hover': {
                backgroundColor: '#58a75b',
                opacity: 0.9,
                color: '#white',
            }, backgroundColor: "#58a75b", color: "white"
        }}>{text}</Button>
    );
}

export default SiteButton;