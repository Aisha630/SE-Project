import React from 'react';
import ImageGallery from 'react-image-gallery';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RenderItem from './render.js';

export const CustomImageGallery = ({ items, ...props }) => {

    const renderLeftNav = (onClick, disabled) => {
        return (
            <IconButton onClick={onClick} disabled={disabled} style={{ color: 'black', position: 'absolute', left: "5%", zIndex: 1, top: "50%" }}>
                <ArrowBackIosIcon />
            </IconButton>
        );
    };

    const renderRightNav = (onClick, disabled) => {
        return (
            <IconButton onClick={onClick} disabled={disabled} style={{ color: 'black', position: 'absolute', right: "5%", zIndex: 1, top: "50%" }}>
                <ArrowForwardIosIcon />
            </IconButton>
        );
    };

    return (
        <ImageGallery
            items={items.map(item => ({
                ...item,
                renderItem: () => <RenderItem item={item} />,
            }))}
            {...props}
            renderLeftNav={renderLeftNav}
            renderRightNav={renderRightNav}
            showPlayButton={false}
            showThumbnails={false}
            showBullets={true}
            showNav={true}
            showFullscreenButton={false}
        />
    );
}

