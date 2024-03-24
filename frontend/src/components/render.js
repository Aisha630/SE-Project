import React, { useState, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div style={{ position: 'relative' }}>
        <ReactImageMagnify {...{
            smallImage: {
                alt: item.originalAlt,
                isFluidWidth: true,
                src: item.original,
            },
            largeImage: {
                src: item.original,
                width: 2 * largeImageSize.width,
                height: 2 * largeImageSize.height,
            },
            enlargedImagePosition: 'over',
            enlargedImageContainerDimensions: { width: '100%', height: '100%' },
        }} />
        <IconButton onClick={()=>navigate("/shop")} sx={{ margin: "10px" }} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
        <img src="/backIcon.png" alt="Back" style={{ width: 65, height: 50 }} />
      </IconButton>
        </div>
    );
};

export default RenderItem;
