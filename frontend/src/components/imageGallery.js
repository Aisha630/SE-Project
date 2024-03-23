import React from 'react';
import ImageGallery from 'react-image-gallery';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CustomImageGallery = (props) => {
    const renderLeftNav = (onClick, disabled) => {
        return (
            <IconButton onClick={onClick} disabled={disabled} style={{ color: 'black', position: 'absolute', left: 0, zIndex: 1, top: "50%" }}>
                <ArrowBackIosIcon />
            </IconButton>
        );
    };

    const renderRightNav = (onClick, disabled) => {
        return (
            <IconButton onClick={onClick} disabled={disabled} style={{ color: 'black', position: 'absolute', right: 0, zIndex: 4, top: "50%", transform: "translateX(-50%)" }}>
                <ArrowForwardIosIcon />
            </IconButton>
        );
    };

    return (
        <ImageGallery
            {...props}
            renderLeftNav={renderLeftNav}
            renderRightNav={renderRightNav}
        />
    );
}

