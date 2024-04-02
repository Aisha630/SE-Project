import React from 'react';
import ImageGallery from 'react-image-gallery';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InnerImageZoom from 'react-inner-image-zoom';
import BackHanger from '../components/backHanger.jsx';
import "../css/zoom.css";


const RenderItem = ({ item }) => {
    return (
        <div style={{ position: "relative", width: '100%', height: '100%' }}>
            <InnerImageZoom src={item.original} zoomSrc={item.original} zoomScale={3} zoomType="hover" hasSpacer={true} hideHint={true} imgAttributes={{ width: '100%', height: '100%', objectFit: 'contain' }} fullscreenOnMobile={true} />
            {/* <img src={item.original} alt={item.originalAlt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> */}
            <BackHanger style={{ margin: "10px", position: 'absolute', top: '10px', left: '10px', zIndex: 2 }} />

        </div>
    );
};

export const CustomImageGallery = ({ items, ...props }) => {

    const renderLeftNav = (onClick, disabled) => {
        return (
            <IconButton onClick={onClick} disabled={disabled} style={{ color: 'black', position: 'absolute', left: "5%", zIndex: 5, top: "50%" }}>
                <ArrowBackIosIcon />
            </IconButton>
        );
    };

    const renderRightNav = (onClick, disabled) => {
        return (
            <IconButton onClick={onClick} disabled={disabled} style={{ color: 'black', position: 'absolute', right: "5%", zIndex: 5, top: "50%" }}>
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
            maxHeight="100vh"
            renderLeftNav={renderLeftNav}
            renderRightNav={renderRightNav}
            showPlayButton={false}
            showThumbnails={false}
            showBullets={true}
            showFullscreenButton={false}
        />
    );
}

