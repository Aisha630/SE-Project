import React from 'react';
import ImageGallery from 'react-image-gallery';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InnerImageZoom from 'react-inner-image-zoom';
import BackHanger from '../components/backHanger.jsx';
import "../css/zoom.css";
import { useEffect, useState } from 'react';

const RenderItem = (({item})=>{
    const [enableZoom, setEnableZoom] = useState(false)

    useEffect(()=>{
        const img = new Image()
        img.src = item.original
        img.onload = ()=>{
            const vw = window.innerWidth
            if (img.naturalWidth > 0.3 * vw )
                setEnableZoom(true)
            else
                setEnableZoom(false)
        }
    }, [item.original])

    return (
        <div style={{ position: "relative", width: '100%', height: '100%' }}>
            {enableZoom ? (
                <InnerImageZoom src={item.original} zoomSrc={item.original} zoomScale={1.8} zoomType="hover" hasSpacer={true} hideHint={true} imgAttributes={{ width: '100%', height: '100%' }} fullscreenOnMobile={true} className="custom-zoom-overlay"/>
            ) : (
                <img src={item.original} alt="" style={{ width: '100%', height: '100%' }} />
            )}
            <BackHanger style={{ margin: "10px", position: 'absolute', top: '10px', left: '10px', zIndex: 2 }} />
        </div>
    );

})

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
            items={items.map((item, index) => ({
                ...item,
                key: index,
                renderItem: () => <RenderItem item={item} key={index}/>,
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

