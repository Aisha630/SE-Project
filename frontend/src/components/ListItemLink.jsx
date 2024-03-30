import React from 'react';
import { ListItemButton, ListItemIcon, Typography, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ListItemLink = ({ text, Icon, to, imgSrc, TypoStyles, ButtonStyles, onClick, pageOn }) => {
    const commonStyles = {
        minWidth: { xs: '30px', sm: '40px', md: '50px' },
        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
        mr: { md: "1px", lg: "10px"},
        
    };

    return (
        <ListItemButton component={RouterLink} to={to} onClick={onClick ? onClick : () => { }} sx={{ '& .MuiListItemIcon-root, & .MuiTypography-root': commonStyles, ...ButtonStyles, maxWidth:'calc(100% - 8px)' }} selected={pageOn===text}>
            {Icon && <ListItemIcon><Icon /></ListItemIcon>}
            {imgSrc && <Avatar src={imgSrc} variant="square" sx={{ width: "5%", height: "5%" }} />}
            <Typography variant="subtitle1" gutterBottom sx={{ ...TypoStyles, ...commonStyles }}>
                {text}
            </Typography>
        </ListItemButton>
    );
};

export default ListItemLink;
