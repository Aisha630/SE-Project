import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import theme from '../themes/homeTheme.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Card, CardMedia, Box,useMediaQuery } from '@mui/material';
import "../css/App.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

function ImageCard({ imageUrl, style }) {

  return (
    <Card sx={{ ...style, borderRadius: '16px', overflow: 'hidden', boxShadow: 3, }}>
      <CardMedia
        component="img"
        height="auto"
        image={imageUrl}
        alt="New item"
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </Card>
  );
}

function OverlayImageCards({ bottomCardProps, topCardProps, link }) {

  return (
    <Box sx={{ position: 'relative', width: 380, height: 490, margin: 0, p:0 }}>
      <ImageCard {...bottomCardProps} style={{
        mt: 5, width: 'calc(100% - 100px)',
        height: 'calc(100% - 100px)', opacity: 0.7, ml:0, p:0, mr:0
      }} />
      <Link to={link}>
        <ImageCard
          {...topCardProps}
          style={{
            position: 'absolute',
            top: -20,
            left: 20,
            width: 'calc(100% - 100px)',
            height: 'calc(100% - 100px)',
            '&:hover': { filter: 'brightness(0.9)' },
            p:0, m:0

          }}
        />
      </Link>
    </Box>
  );
}

function CarouselComponent() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        fetch('http://localhost:5003/latest?limit=10', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json()).then(data => {
            const formattedProducts = data.map(product => ({
                name: product.name,
                image: `http://localhost:5003${product.images[0]}`, 
                id: product._id
            }));

            console.log(formattedProducts.length);
            setProducts([...formattedProducts, ...formattedProducts, ...formattedProducts]);
            console.log(products.length);

        }).catch(error => {
            console.error('Error:', error);
            if (error.status in [401, 500])
                navigate('/login');
        });
    }, [token]);

    return (
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={10}
                slidesPerView={md ? 3 : sm ? 2 : 1}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                sx={{m:0, p:0}}>
                {products.map((product, index) => (
                    <SwiperSlide key={index} sx={{m:0, p:0}}>
                        <OverlayImageCards
                            bottomCardProps={{ imageUrl: index % 2 === 0 ? "green.png" : "pink.png" }}
                            topCardProps={{ imageUrl: product.image }}
                            link={`/shop/${product.id}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
    );
}

export default CarouselComponent;

