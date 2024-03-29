// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import OverlayImageCards from './card.jsx';
// import '../css/App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
// import '../css/App.css';
import theme from '../themes/homeTheme.js';

// const CarouselComponent = () => {

//     const token = useSelector((state) => state.auth.token);
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([])

//     useEffect(() => {
//         fetch('http://localhost:5003/shop', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(response => response.json()).then(data => {
//             const formattedProducts = data.slice(0, 4).map(product => ({
//                 name: product.name,
//                 image: `http://localhost:5003${product.images[0]}`, // Assuming the first image in the array is the main image
//                 id: product._id
//             }));
//             setProducts(formattedProducts);

//         }).catch(error => {
//             console.error('Error:', error);
//             if (error.status in [401, 500])
//                 navigate('/login');
//         });
//     }, [token]);

//     const settings = {
//         infinite: true,
//         speed: 800,
//         slidesToShow: 3,
//         slidesToScroll: 4,
//         responsive: [
//             {
//                 breakpoint: 1500,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 3,
//                     infinite: true,
//                 },
//             },
//             {
//                 breakpoint: 1300,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 2,
//                     // initialSlide: 2,
//                     infinite: true,
//                 },
//             },
//             {
//                 breakpoint: 980,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     // infinite: true,
//                 },
//             },
//         ],
//     };
//     return (
//         <Slider className="slider-container" {...settings} >
//             {products.map((product, index) => (
//                 <div key={product._id}>
//                     <OverlayImageCards
//                         bottomCardProps={{ imageUrl: index % 2 === 0 ? "green.png" : "pink.png" }}
//                         topCardProps={{ imageUrl: product.image }}
//                         link={`/shop/${product.id}`} // link this to the page where the product is displayed that Bilal is going to make
//                     />
//                 </div>
//             ))}
//         </Slider>
//     );
// };

// export default CarouselComponent;

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { useRef } from 'react';

// Import modules you need
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

// Install Swiper modules


function CarouselComponent() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const lg = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        fetch('http://localhost:5003/shop', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json()).then(data => {
            const formattedProducts = data.slice(0, 4).map(product => ({
                name: product.name,
                image: `http://localhost:5003${product.images[0]}`, // Assuming the first image in the array is the main image
                id: product._id
            }));
            setProducts(formattedProducts);

        }).catch(error => {
            console.error('Error:', error);
            if (error.status in [401, 500])
                navigate('/login');
        });
    }, [token]);



    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={5}
                slidesPerView={md ? 3 : sm ? 2 : 1}
                navigation
                // pagination={{ clickable: true }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                style={{ width: '100%', height: '100%' }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <OverlayImageCards
                            bottomCardProps={{ imageUrl: index % 2 === 0 ? "green.png" : "pink.png" }}
                            topCardProps={{ imageUrl: product.image }}
                            link={`/shop/${product.id}`} // link this to the page where the product is displayed that Bilal is going to make
                            key={index}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>


        </>
    );
}

export default CarouselComponent;

