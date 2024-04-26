import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import theme from '../themes/homeTheme.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Card, CardMedia, Box, useMediaQuery } from '@mui/material';
import "../css/App.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

function ImageCard({ imageUrl, style }) {

  return (
    <Card sx={{ ...style, borderRadius: '16px', overflow: "hidden", boxShadow: 3, }}>
      <CardMedia
        component="img"
        // height="auto"
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
    <Box sx={{ position: "relative", width: "97%", height: "97%", margin: 0, p: 0, mb: 8 }}>
      <ImageCard {...bottomCardProps} style={{ width: "calc(100%)", height: "calc(100%)", mt: 5, ml: 1, }} />
      <Link to={link} style={{ position: "absolute", bottom: 20, right: -5 }}>
        <ImageCard
          {...topCardProps}
          style={{
            width: "calc(100% - 20px)",
            height: "calc(100% - 20px)",
            '&:hover': { filter: 'brightness(0.9)' },
            p: 0, m: 0
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
      setProducts([...formattedProducts, ...formattedProducts, ...formattedProducts]);

    }).catch(error => {
      console.error('Error:', error);
      if (error.status in [401, 500])
        navigate('/login');
    });
  }, [token]);

  return (
    <Swiper
      modules={[Navigation,Pagination, Autoplay, A11y]}
      spaceBetween={70}
      slidesPerView={md ? 3 : sm ? 2 : 1}
      pagination={{ clickable: true, dynamicBullets: true }}
      // navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      sx={{ m: 5, p: 5,}}         
      
      >

      {products.map((product, index) => (
        <SwiperSlide key={index} >
          <OverlayImageCards
            bottomCardProps={{ imageUrl: "/cardBack.svg" }}
            topCardProps={{ imageUrl: product.image }}
            link={`/shop/${product.id}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarouselComponent;

