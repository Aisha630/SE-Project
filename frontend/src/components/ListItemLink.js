import React from 'react';
import { ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ListItemLink = ({ text, Icon, to, TypoStyles, ButtonStyles }) => {
    const commonStyles = {
        minWidth: { xs: '30px', sm: '40px', md: '50px' },
        fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
        mr: { xs: '3px', sm: "5px", md: "10px" }
    };

    return (
        <ListItemButton component={RouterLink} to={to} sx={{ '& .MuiListItemIcon-root, & .MuiTypography-root': commonStyles, ...ButtonStyles }}>
            <ListItemIcon><Icon /></ListItemIcon>
            <Typography variant="subtitle1" gutterBottom sx={{ ...TypoStyles, ...commonStyles }}>
                {text}
            </Typography>
        </ListItemButton>
    );
};

export default ListItemLink;
