import OverlayImageCards from './card.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme.js';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import "../css/App.css"

function CarouselComponent() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    useEffect(() => {
        fetch('http://localhost:5003/latest?limit=10', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json()).then(data => {
            const formattedProducts = data.map(product => ({
                name: product.name,
                image: `http://localhost:5003${product.images[0]}`, // Assuming the first image in the array is the main image
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
        <>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={10}
                slidesPerView={lg || md ? 3 : sm ? 2 : 1}
                // slidesPerGroup={1}
                // navigation={false}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                // loop={true}
                sx={{m:0, p:0}}
                 
            >
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


        </>
    );
}

export default CarouselComponent;

