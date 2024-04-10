import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Typography, Box, Grid, Avatar, Stack, Rating, Card, FormControl, Select, MenuItem } from '@mui/material';
import theme from '../themes/homeTheme';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Nav from '../components/nav.jsx';
import Drawer from '../components/drawer.jsx';
import { useNavigate } from 'react-router-dom';
import { profileStyles, profileAvatarStyles, graphStyles } from '../components/profilestyles.jsx';
import MainCategoryToolbar from '../components/maincategoriestoolbar.jsx';
import UserProducts from '../components/userProducts.jsx';
import { LineChart } from '@mui/x-charts/LineChart'
import NoProducts from '../components/noProducts.jsx';
import "../css/App.css";




const UserProfile = () => {
    const [selectedTab, setSelectedTab] = useState('For Sale');
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [graph, setGraph] = useState('Monthly');
    const [refresh, setRefresh] = useState(false);

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
            } return res.json()
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
            } return res.json()
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

        })
            .catch((error) => { console.log("The error is:", error) });

    }, [token, navigate, username, selectedTab, refresh])

    const rating = user.rating ? user.rating.rating : 0;
    const currentProducts = products;
    // console.log("The current products are ", currentProducts, "The products are ", products, "The page is ", page, "The products per page are ", productsPerPage);

    const dataArray = [
        { saleDate: '01', price: 8000 },
        { saleDate: '02', price: 10000 },
        { saleDate: '03', price: 9300 },
        { saleDate: '04', price: 30500 },
        { saleDate: '05', price: 12000 },
        { saleDate: '06', price: 23000 },
        { saleDate: '07', price: 14000 },
        { saleDate: '08', price: 8000 },
        { saleDate: '09', price: 26000 },
        { saleDate: '10', price: 17000 },
        { saleDate: '11', price: 28000 },
        { saleDate: '12', price: 39000 },
        { saleDate: '13', price: 10000 },
        { saleDate: '14', price: 31000 },
        { saleDate: '15', price: 12000 },
        { saleDate: '16', price: 32000 },
        { saleDate: '17', price: 24000 },
        { saleDate: '18', price: 25000 },
        { saleDate: '19', price: 16000 },
        { saleDate: '20', price: 27000 },
        { saleDate: '21', price: 28000 },
        { saleDate: '22', price: 9000 },
        { saleDate: '23', price: 30000 },
        { saleDate: '24', price: 11000 },
        { saleDate: '25', price: 32000 },
        { saleDate: '26', price: 23000 },
        { saleDate: '27', price: 23000 },
        { saleDate: '28', price: 32000 },
        { saleDate: '29', price: 16000 },
        { saleDate: '30', price: 27000 },
        { saleDate: '31', price: 18000 },

    ];
    const sumOfSales = dataArray.reduce((acc, item) => acc + item.price, 0);

    const xdata = dataArray.map((item) => item.saleDate);
    const ydata = dataArray.map((item) => item.price);

    const handleGraphChange = (event) => {
        console.log(event.target.value);
        setGraph(event.target.value);
    }

    const handleDeleteItem = (id) => {
        fetch(`http://localhost:5003/shop/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (!res.ok) {
                // navigate("/login");
                console.log("Error deleting item")
            } return res.json()
        }).then((data) => {
            console.log("The data is ", data);
            setRefresh(!refresh);
        })
            .catch((error) => { console.log("The error is:", error) });
        console.log("Delete item with id ", id);
    }

    const handleReopenItem = (product) => {
        
        let queryBody = {};
        if (product.mode === 'SaleProduct') {
            queryBody = { price: product.price };
        } else if (product.mode === 'AuctionProduct') {
            queryBody = { startingBid: product.startingBid, endTime: product.endTime };
        }


        console.log("in user profile and the product is:", product);
        console.log("in user profile and the queryBody is:", queryBody);
        fetch(`http://localhost:5003/shop/${product._id}/reopen`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryBody)
        }).then((res) => {
            if (!res.ok) {
                // navigate("/login");
                console.log("Error reopening item")
            } return res.json()
        }).then((data) => {
            console.log("The data is ", data);
            setRefresh(!refresh);
        })
            .catch((error) => { console.log("The error is:", error) });
        console.log("Reopen item with id ", product._id);
    }


    return (
        <ThemeProvider theme={theme}>
            <Nav Drawer={Drawer} Search={Box} ShowLogo={false} styles={{
                // backgroundImage: "url('userprofilebg.svg')",
            }} />
            <Grid style={{
                minHeight: '100vh',
                width: '100%',
                backgroundImage: "url('userprofilebg.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                maxWidth: "100%",
                // position: "relative",
                // backgroundAttachment: "scroll",

            }}>
                <Typography variant="h4" sx={{ color: "white", textAlign: "left", paddingTop: 2, marginLeft: '2%' }}>Dashboard & Profile</Typography>
                <Grid container spacing={2} style={{ height: '30%', width: '100%', paddingTop: 5, position: "absolute", }}>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card sx={graphStyles}>
                            <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', width: '100%', height: '1%' }}>
                                <FormControl size="small" sx={{ minWidth: 120, color: '#517652' }}>
                                    <Select
                                        labelId=""
                                        id="graph-select"
                                        value={graph}
                                        onChange={handleGraphChange}

                                    >
                                        <MenuItem value={"Monthly"}>Monthly</MenuItem>
                                        <MenuItem value={"Yearly"}>Yearly</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Typography variant="subtitle1" sx={{ display: 'flex', position: 'absolute', top: 20, left: 20 }}>
                                Overall Sales
                            </Typography>
                            <Typography variant="h6" sx={{ display: 'flex', position: 'absolute', top: 40, left: 20, }}>
                                {sumOfSales} PKR
                            </Typography>


                            <Box sx={{ width: '100%', height: '110%', paddingTop: 2 }}>

                                <LineChart
                                    xAxis={[{ data: xdata }]}
                                    series={[
                                        {
                                            data: ydata,
                                        },
                                    ]}
                                />
                            </Box>

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
                                <Typography variant='h6' sx={{ color: "black", textAlign: "center", }}> <strong>Rating: </strong></Typography>
                                <Rating name="half-rating-read" value={rating} precision={0.2} readOnly size='large' sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#e87975',
                                    },
                                    '& .MuiRating-iconHover': {
                                        color: '#e87975',
                                    },
                                }} />
                            </Stack>
                        </Card>

                    </Grid>
                </Grid>

                <Box sx={{
                    position: 'absolute', // Position the toolbar absolutely
                    bottom: 200, // Align it to the bottom of the parent container
                    // bottom: lg? 200: 450, // Align it to the bottom of the parent container
                    left: 0,
                    width: '100%', // Span the full width of the container
                    zIndex: 2, // Ensure it's above the other content
                    paddingBottom: 5,
                }}>
                    <MainCategoryToolbar setCategory={setSelectedTab} category={selectedTab} navItems={["Auctioned", "For Sale", "Donations"]} styles={{ backgroundColor: 'white' }} />

                    {/* Product Grid */}
                    <Grid container spacing={0} sx={{
                        display: 'flex',
                        width: '100%',
                        position: 'absolute',
                        backgroundColor: "white",
                    }}>
                        {currentProducts.length > 0 && <UserProducts products={currentProducts} handleDeleteItem={handleDeleteItem} selectedTab={selectedTab} handleReopenItem={handleReopenItem} />}
                    </Grid>
                    {currentProducts.length === 0 && <NoProducts styles={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        backgroundColor: "white"
                    }} />}
                </Box>

            </Grid>


        </ThemeProvider >

    );


}

export default UserProfile;