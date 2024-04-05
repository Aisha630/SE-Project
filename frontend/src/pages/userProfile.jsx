import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Tab, Paper, Typography, Box, Grid, Avatar, Stack, Rating, Card, Pagination, Link, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import theme from '../themes/homeTheme';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Nav from '../components/nav.jsx';
import Drawer from '../components/drawer.jsx';
import { useNavigate } from 'react-router-dom';
import { profileStyles, profileAvatarStyles, graphStyles } from '../components/profilestyles.jsx';
import MainCategoryToolbar from '../components/maincategoriestoolbar.jsx';
import UserProducts from '../components/userProducts.jsx';
import SalesGraph from '../components/salesGraph.jsx';




const UserProfile = () => {
    const [selectedTab, setSelectedTab] = useState('For Sale');
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // State for pagination
    const [page, setPage] = useState(1);
    const [productsPerPage] = useState(2); // Number of products per page

    const username = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        fetch(`http://localhost:5003/profile?username=${username}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (!res.ok) {
                navigate("/login");
            }; return res.json()
        }).then((data) => { console.log("The data is ", data); setUser(data) })
            .catch((error) => { console.log("The error is:", error) });


        fetch(`http://localhost:5003/dashboard`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (!res.ok) {
                navigate("/login");
            }; return res.json()
        }).then((data) => {
            // console.log("The data is ", data);
            if (selectedTab === 'Auctioned') {
                // Filter the products that are auctioned
                setProducts(data.filter((product) => product.__t === 'AuctionProduct'));
            } else if (selectedTab === 'For Sale') {
                // Filter the products that are for sale
                setProducts(data.filter((product) => product.__t === 'SaleProduct'));
            }
            else if (selectedTab === 'Donations') {
                // Filter the products that are for sale
                setProducts(data.filter((product) => product.__t === 'DonationProduct'));
            }
            // setProducts(data);
        })
            .catch((error) => { console.log("The error is:", error) });

    }, [token, navigate, username, selectedTab])

    const rating = user.rating ? user.rating.rating : 0;

    const indexOfLastProduct = page * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    console.log("The current products are ", currentProducts, "The products are ", products, "The page is ", page, "The products per page are ", productsPerPage);



    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const dataArray = [
        { saleDate: '2021-01-01', price: 800 },
        { saleDate: '2021-01-02', price: 1000 },
        { saleDate: '2021-01-03', price: 930 },
        { saleDate: '2021-01-04', price: 1050 }
    ];
    const sumOfSales = dataArray.reduce((acc, item) => acc + item.value, 0);

    return (
        <ThemeProvider theme={theme}>
            <Nav Drawer={Drawer} Search={Box} ShowLogo={true} styles={{
                // backgroundImage: "url('userprofilebg.svg')",
            }} />
            <Grid style={{
                minHeight: '100vh',
                width: '100vw',
                backgroundImage: "url('userprofilebg.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: 'relative',
            }}>
                <Typography variant="h4" sx={{ color: "white", textAlign: "left", paddingTop: 2, marginLeft: '2%' }}>Dashboard & Profile</Typography>
                <Grid container style={{ height: '30%', width: '100vw', paddingTop: 5 }}>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card sx={graphStyles}>
                            <Typography variant="h6" sx={{ position: 'absolute', top: 20, left: 20 }}>
                            <SalesGraph data2={dataArray} />
                            </Typography>

                        </Card>
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card sx={profileStyles}>
                            <Avatar src={user.avatar} sx={profileAvatarStyles} />
                            <Typography variant='h6' sx={{ color: "black", textAlign: "center", mt: 8, }}>
                                <strong>Username:</strong>  {user.username}
                            </Typography>
                            <Typography variant='h6' sx={{ color: "black", textAlign: "center" }}>
                                <strong>Email:</strong> {user.email}
                            </Typography>

                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Typography variant='h6' sx={{ color: "black", textAlign: "center" }}> <strong>Rating: </strong></Typography>
                                <Rating name="half-rating-read" value={rating} precision={0.2} readOnly size='large' />
                            </Stack>
                        </Card>

                    </Grid>
                </Grid>

                <Box sx={{
                    position: 'absolute', // Position the toolbar absolutely
                    bottom: 300, // Align it to the bottom of the parent container
                    left: 0,
                    width: '100%', // Span the full width of the container
                    zIndex: 2, // Ensure it's above the other content
                    paddingBottom: 5,
                }}>
                    <MainCategoryToolbar setCategory={setSelectedTab} category={selectedTab} navItems={["Auctioned", "For Sale", "Donations"]} styles={{ backgroundColor: 'white' }} />

                    {/* Product Grid */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, }} sx={{
                        display: 'flex',
                        width: '100vw',
                        position: 'absolute',
                    }}>

                        <UserProducts products={currentProducts} />
                    </Grid>
                </Box>
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                    <Pagination
                        count={Math.ceil(products.length / productsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </Box>
            </Grid>


        </ThemeProvider >

    );


}

export default UserProfile;