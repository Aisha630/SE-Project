import React, {useState} from 'react';
import { Grid, Box, useMediaQuery } from '@mui/material';
import { useCart } from '../context/cartContext';
import { useSelector } from 'react-redux';
import theme from '../themes/homeTheme';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import SiteButton from '../components/button';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../components/infoCard';
import BackHanger from '../components/backHanger';

const OrderSummaryPage = () => {
    const lg = useMediaQuery(theme.breakpoints.up('sm'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const { cartItems, fetchCartItems, sellers } = useCart();
    const [checkingOut, setCheckingOut] = useState(false);

    const checkout = () => {
        setCheckingOut(true);
        fetch(`https://api.secondtimearound.xyz/checkout`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then(response => {
            if (response.ok) {
                toast.success("Checkout successful");
                fetchCartItems();
                navigate("/");
            } else {
                
                toast.error("Error checking out");
                throw new Error('Failed to checkout');
            }
        }).catch(error => {
            console.error(error);
            toast.error("Error checking out");
        }).finally(() => {
            setCheckingOut(false);
        });
    }

    const deleteFromCart = (product) => {
        fetch(`https://api.secondtimearound.xyz/cart?id=${product._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Item removed from cart");
                    fetchCartItems();
                } else {
                    throw new Error('Failed to delete item');
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Error removing item from cart");
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{backgroundColor:"background.default", minHeight:"110vh"}}>
            <Grid container spacing={5} sx={{ paddingRight: sm ? 2 : 8, paddingLeft: sm ? 2 : 8, backgroundColor:"background.default", minHeight:"100vh"}}>
                {/* Back button */}
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{backgroundColor:"background.default"}}>
                    <Box style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", m: 0, paddingLeft: 8 }} sx={{backgroundColor:"background.default"}}>
                        <BackHanger style={{ marginTop: "20px", mb: 0 }} imgStyle={{ width: lg ? 65 : 45, height: lg ? 50 : 35, display: "flex", flexDirection: "column", alignItems: "flex-start" }} />
                    </Box>
                </Grid>

                {/* Order Summary and Seller's Details cards */}
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{backgroundColor:"background.default"}}>
                    <InfoCard
                        title="Order Summary"
                        items={cartItems}
                        isCart={true}
                        deleteItem={deleteFromCart}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InfoCard
                        title="Seller's Details"
                        items={sellers}
                        isCart={false}
                    />
                </Grid>

                {/* Confirm Purchase button */}
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Box sx={{ textAlign: "right", mr: 0, mt: 0, mb: 3, paddingRight: 0, paddingTop: 1 , }}>
                        <SiteButton text={'Confirm Purchase'} styles={{ padding: 2, paddingLeft: lg ? 8 : 4, paddingRight: lg ? 8 : 4, fontSize: "0.95rem" }} onClick={checkout} disabled={checkingOut}/>
                    </Box>
                </Grid>
            </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default OrderSummaryPage;
