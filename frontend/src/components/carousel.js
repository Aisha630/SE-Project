import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OverlayImageCards from './card.js';
import '../css/App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CarouselComponent = () => {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [products, setProducts] = useState([])

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 4,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 4,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            {products.map((product, index) => (
                <div key={product._id}>
                    <OverlayImageCards
                        bottomCardProps={{ imageUrl: index % 2 === 0 ? "green.png" : "pink.png" }}
                        topCardProps={{ imageUrl: product.image }}
                        link={`/shop/${product.id}`} // link this to the page where the product is displayed that Bilal is going to make
                    />
                </div>
            ))}
        </Slider>
    );
};

export default CarouselComponent;
