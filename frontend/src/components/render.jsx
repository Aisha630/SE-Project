import React, { useState, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme.js';


const RenderItem = ({ item }) => {
    const navigate = useNavigate();
    const [largeImageSize, setLargeImageSize] = useState({});
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setLargeImageSize({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = item.original;
    }, [item.original]);
    const lg = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <div style={{ position: "relative", width: '100%', height: '100%' }}>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: item.originalAlt,
                    isFluidWidth: true,
                    src: item.original,
                    // objectFit: 'cover',
                    // height: 1000,

                },
                largeImage: {
                    src: item.original,
                    width: 2 * largeImageSize.width,
                    height: 2 * largeImageSize.height,
                },
                enlargedImagePosition: 'over',
                enlargedImageContainerDimensions: { width: '100%', height: '100%' },
            }} />
            <IconButton onClick={() => navigate("/shop")} sx={{ margin: "10px" }} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                <img src="/backIcon.png" alt="Back" style={{ width: lg ? 65 : 40, height: lg ? 50 : 30 }} />
            </IconButton>
        </div>
    );
};

export default RenderItem;
