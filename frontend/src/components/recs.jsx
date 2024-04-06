import { React, useState, useEffect } from "react";
import Slider from "react-slick";
import { ThemeProvider, Typography } from "@mui/material";
import theme from "../themes/homeTheme.js";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Recs = () => {

    const [recs, setRecs] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [slides, setSlidesToShow] = useState(1);

    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        fetch(`http://localhost:5003/shop/${id}/recs`, {
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
    }, []);

    useEffect(() => {
        const pageWidth = window.innerWidth;
        setSlidesToShow(Math.floor(pageWidth / 250))
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(slides, recs.length),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        rows: 1,
        swipe: true,
        adaptiveHeight: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(slides, recs.length),
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(slides, recs.length),
                    slidesToScroll: 1,
                    initialSlide: 2,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 480,
                settings: {

                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            }
        ]
    };



    return (

        <ThemeProvider theme={theme}>
            {recs.length!=0 && <Slider {...settings}>
                {recs.map((product, index) => (
                    // <Link key={index} to={`/shop/${product.id}`} style={{padding:0, m:0, boxSizing:"border-box"}}>
                    <div key={index} style={{p:0, m:0, '&:hover': { filter: 'brightness(0.9)', cursor: 'pointer'},}}>
                        <img src={product.image} alt={product.name} style={{ height: 'auto', width: "250px", boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.2)", borderRadius: 10, 
                    

                    

                    }} onClick={()=>navigate(`/shop/${product.id}`)} />
                        </div>
                    // </Link>
                ))}



            </Slider>}
            {recs.length==0 && <Typography variant="h6" sx={{p:5, pb:8}}> Woah! It looks like this is one of a kind. Grab it now before its too late! </Typography> }

        </ThemeProvider>


    );


}


export default Recs;