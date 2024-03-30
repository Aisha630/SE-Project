import React from 'react';
import { Grid, Box } from '@mui/material';
import { useCart } from '../context/cartContext';
import { useSelector } from 'react-redux';
import theme from '../themes/homeTheme';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import SiteButton from '../components/button';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../components/infoCard';
import { useMediaQuery } from '@mui/material';

const OrderSummaryPage = () => {
    const lg = useMediaQuery(theme.breakpoints.up('sm'));

    const navigate = useNavigate();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    // const xs 
    const token = useSelector((state) => state.auth.token);
    const { cartItems, fetchCartItems, sellers } = useCart();

    const checkout = () => {
        fetch(`http://localhost:5003/checkout`, {
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
        })
    }

    const deleteFromCart = (product) => {
        fetch(`http://localhost:5003/cart?id=${product._id}`, {
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
            <Grid container spacing={5} sx={{ paddingRight: sm ? 2 : 8, paddingLeft: sm ? 2 : 8 }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", m: 0, paddingLeft: 8 }}>
                        <IconButton onClick={() => navigate("/shop")} edge="start" sx={{ marginTop: "20px", mb: 0 }} >
                            <img src="backIcon.png" alt="Back Icon" style={{ width: lg ? 65 : 45, height: lg ? 50 : 35, display: "flex", flexDirection: "column", alignItems: "flex-start", }} />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box sx={{ textAlign: "right", mr: 0, mt: 0, mb: 3, paddingRight: 0, paddingTop: 1 }}>
                <SiteButton text={'Confirm Purchase'} styles={{ padding: 2, paddingLeft: lg? 8:4, paddingRight: lg?8:4, fontSize: "0.95rem" }} onClick={checkout} />
            </Box>
            </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default OrderSummaryPage;
