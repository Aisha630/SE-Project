import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OverlayImageCards from './card.js';
// import ImageCardWithOverlay from "./card2.js"
import '../css/App.css';



const CarouselComponent = () => {
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
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            <div><OverlayImageCards bottomCardProps={{ imageUrl: "green.png" }} topCardProps={{ imageUrl: "shp1.jpg" }} /></div>
            <div><OverlayImageCards bottomCardProps={{ imageUrl: "pink.png" }} topCardProps={{ imageUrl: "shp1.jpg" }} /></div>
            <div><OverlayImageCards bottomCardProps={{ imageUrl: "green.png" }} topCardProps={{ imageUrl: "shp1.jpg" }} /></div>
        </Slider>
    );
};

export default CarouselComponent;
