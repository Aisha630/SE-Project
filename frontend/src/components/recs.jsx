import { React, useState, useEffect } from "react";
import Slider from "react-slick";
import { ThemeProvider, Typography, Card, CardMedia } from "@mui/material";
import theme from "../themes/homeTheme.js";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recs = ({productType}) => {
    // Empty slide component
    const EmptySlide = () => (
        <Card sx={{ height: "auto", maxWidth: "240px", boxShadow: "none", opacity: 0, m: 2, borderRadius: 2 }}>
        </Card>
    );

    const [recs, setRecs] = useState([]);
    const { id } = useParams(); // Get the product id from the URL
    const navigate = useNavigate();
    const [slides, setSlidesToShow] = useState(1);
    const emptySlidesCount = slides - recs.length > 0 ? slides - recs.length : 0;
    const token = useSelector((state) => state.auth.token);

    productType = (productType === "DonationProduct" ) ? "donate" : productType ===  "AuctionProduct"? "auction" : "sale";

    useEffect(() => {
        fetch(`http://localhost:5003/shop/${id}/recs?productType=${productType}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => {
            if (!response.ok)
                navigate("/login")
            return response.json()
        }).then(data => {
            const formattedProducts = data.map(product => ({
                name: product.name,
                image: `http://localhost:5003${product.images[0]}`,
                id: product._id
            }));
            setRecs(formattedProducts)
        }).catch(error => { console.log(error) })
    }, [navigate, token, id]);


    // This useEffect hook is used to update the number of slides to show based on the window width
    useEffect(() => {
        const updateSlidesToShow = () => {
            const pageWidth = window.innerWidth;
            setSlidesToShow(Math.floor(pageWidth / 280));
          };
          updateSlidesToShow();
          window.addEventListener('resize', updateSlidesToShow);
          return () => window.removeEventListener('resize', updateSlidesToShow);
    }, [])

    // Slick settings
    const settings = {
        dots: emptySlidesCount === 0 ? true : false,
        infinite: emptySlidesCount === 0 ? true : false,
        speed: 500,
        slidesToShow: slides,
        slidesToScroll: 1,
        autoplay: emptySlidesCount === 0 ? true : false,
        autoplaySpeed: 1500,
        swipe: true,
        adaptiveHeight: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slides,
                    slidesToScroll: 1,
                    infinite: emptySlidesCount == 0 ? true : false,
                    dots: emptySlidesCount === 0 ? true : false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: slides,
                    slidesToScroll: 1,
                    infinite: emptySlidesCount == 0 ? true : false,
                    dots: emptySlidesCount === 0 ? true : false,
                }
            },
            {
                breakpoint: 480,
                settings: {

                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    autoplay: true,
                    lazyLoad: true,
                }
            }
        ]
    };

    return (

        <ThemeProvider theme={theme}>
            {recs.length != 0 && <Slider {...settings}>
                {recs.map((product, index) => (
                    <Card key={index} sx={{ height: "auto", maxWidth: "240px", boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.2)", mx: 2, borderRadius: 2, '&:hover': { filter: 'brightness(0.9)', cursor: 'pointer', } }}>
                        <Link to={`/shop/${product.id}`} key={index}  >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        </Link>
                    </Card>
                ))}
                {/* Add empty slides to fill the slider */}
                {[...Array(emptySlidesCount)].map((_, index) => (
                    <EmptySlide key={`empty-${index}`} />
                ))}
            </Slider>}
            {recs.length == 0 && <Typography variant="h6" sx={{ p: 5, pb: 8 }}> Woah! It looks like this is one of a kind. Grab it now before its too late! </Typography>}

        </ThemeProvider>


    );


}


export default Recs;