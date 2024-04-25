import React from 'react';
import { IconButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../themes/homeTheme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackHanger = ({ style, onClick, imgStyle }) => {
    const navigate = useNavigate();
    const lg = useMediaQuery(theme.breakpoints.up('sm'));
    const defaultImgStyle = { width: lg ? 65 : 40, height: lg ? 50 : 30 };
    const defaultClickHandler = () => navigate("/shop");
    const handleClick = onClick || defaultClickHandler;
    const imgStyles = imgStyle || defaultImgStyle;

    return (
        <IconButton onClick={handleClick} sx={{ ...style }}>
            {/* <img src="/backIcon.png" alt="Back" style={{ ...imgStyles }} /> */}
            <ArrowBackIcon style={{ ...imgStyles }} />
        </IconButton>
    );
};

export default BackHanger;
